import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { estimateCrud } from '../../models/crud';

export const postEstimate = (app: Application) => {
    app.post(`${estimateCrud.route}_id/:user_id/:request_id`, async (req: Request, res: Response) => {
        req.body.user_id = req.params.user_id;
        req.body.request_id = req.params.request_id;
        createFunctionId(res, req, estimateCrud);
    });
};
