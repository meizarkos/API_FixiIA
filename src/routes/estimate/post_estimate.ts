import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { estimateCrud } from '../../models/crud';

export const postEstimate = (app: Application) => {
    app.post(`${estimateCrud.route}_id`, async (req: Request, res: Response) => {
        const timing = req.body.timing;
        delete req.body.timing;
        const estimate = await createFunctionId(res, req, estimateCrud, true);
        if (estimate === null) return;
        console.log(timing);
        res.status(201).json({ message: `Item created in ${estimateCrud.route}`, item: estimate });
    });
};
