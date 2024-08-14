import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { estimateCrud } from '../../models/crud';

export const postEstimate = (app: Application) => {
    app.post(`${estimateCrud.route}_id`, async (req: Request, res: Response) => {
        createFunctionId(res, req, estimateCrud);
    });
};
