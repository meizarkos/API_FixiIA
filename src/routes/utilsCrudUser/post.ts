import { Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { getAllErrors } from '../../utils';
import { ValidationError, UniqueConstraintError} from 'sequelize';


export async function createFunctionId(res: Response, req: Request, config: CrudAdmin,returnElement = false) {
    if (config.post !== undefined && config.post === false) {
        res.status(500).json({
            error: 'Error in the server',
            message: 'You aren t suppose to use this model like this'
        });
        return null;
    }

    try {
        const authorizedAttributes = Object.keys(config.model.getAttributes()).filter(
            (attr) => !config.forbidden.includes(attr)
        );

        if (Object.keys(req.body).some((key) => !authorizedAttributes.includes(key))) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Provided attributes are not valid or allowed.'
            });
            return null;
        }
        
        
        if (config.champNameToFillWithTokenId !== undefined) {
            req.body[config.champNameToFillWithTokenId] = req.jwt.payload.id;
        }

        const newItem = await config.model.create(req.body);
        if (returnElement) {
            return newItem;
        }
        return res.status(201).json({ message: `Item created in ${config.route}`, item: newItem });
    } catch (e: unknown) {
        const attributes = Object.keys(config.model.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return null;
        }

        console.error(e); // Log the error for server-side inspection
        res.status(500).json({ error: 'Error in the server', message: 'Error creating new item.' });
        return null;
    }
}