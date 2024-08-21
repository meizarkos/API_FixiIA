import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { estimateCrud } from '../../models/crud';

export const postEstimate = (app: Application) => {
    app.post(`${estimateCrud.route}_id`, async (req: Request, res: Response) => {
        const timings = req.body.timing;
        req.body.timing = undefined;
        console.log(req.body);
        const estimate = await createFunctionId(res, req, estimateCrud, true);
        console.log(estimate);
        if (estimate === null) return;
        res.status(201).json({ message: `Item created in ${estimateCrud.route}`, item: estimate });
    });
};
