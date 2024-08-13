import { Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { Model } from 'sequelize';

/* eslint-disable */
export async function getCrudByIdInToken(res: Response, req: Request, config: CrudAdmin): Promise<Model<any, any>[]> {
    if (config.get !== undefined && config.get === false) {
        res.status(500).json({
            error: 'Error in the server',
            message: 'You aren t suppose to use this model like this'
        });
        return null;
    }

    try {
        if (!req.jwt.payload.id) {
            res.status(401).json({ message: `Token not found in ${config.route}token` });
            return null;
        }

        if (config.champNameToFindById == null || config.champNameToFindById == undefined) {
            res.status(500).json({
                error: 'Internal Server Error',
                message: `You forgot to modify the model to add champNameToFindById`
            });
            return null;
        }

        const champAsPrimaryKey = config.champNameToFindById;

        const whereClause = {};
        whereClause[champAsPrimaryKey] = req.jwt.payload.id; //user_id : req.jwt.payload.id

        const item = await config.model.findAll({ where: whereClause });

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return null;
        }

        return item;
    } catch (e: unknown) {
        console.log(e);
        res.status(500).json({ error: 'Error in the server', message: 'Error getting item.' });
        return null;
    }
}

export const getAllFromCrud = async (res: Response, config: CrudAdmin): Promise<Model<any, any>[]> => {
    if (config.get !== undefined && config.get === false) {
        res.status(500).json({
            error: 'Error in the server',
            message: 'You aren t suppose to use this model like this'
        });
        return null;
    }

    try {
        const item = await config.model.findAll();

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return null;
        }

        return item;
    } catch (e: unknown) {
        console.log(e);
        res.status(500).json({ error: 'Error in the server', message: 'Error getting item.' });
        return null;
    }
};
