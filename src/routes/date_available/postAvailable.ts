import { AvailableDate } from '../../models';
import { Application, Request, Response } from 'express';
import { getAllErrors } from '../../utils';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export const postAvailable = (app: Application) => {
    app.post('/monthAvailable', async (req: Request, res: Response) => {
        try {
            const tokenId = req.jwt.payload.id;

            req.body.company_id = tokenId;
            //const date = parseDate(new Date(req.body.available_date));
            const date = new Date(req.body.available_date);
            const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11);
            req.body.available_date = dateTime;
            const available = await AvailableDate.create(req.body);

            available['company_id'] = undefined;

            res.status(200).json({ message: 'New item created in available_date', item: available });
        } catch (e: unknown) {
            const attributes = Object.keys(AvailableDate.getAttributes());

            if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
                getAllErrors(e, res, attributes);
                return;
            }

            console.error(e); // Log the error for server-side inspection
            res.status(500).json({ error: 'Error in the server', message: 'Error creating new item.' });
        }
    });
};
