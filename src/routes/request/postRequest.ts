import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { requestCrud } from '../../models/crud';

export const postRequest = (app: Application) => {
    app.post(`${requestCrud.route}_id`, async (req: Request, res: Response) => {
        createFunctionId(res, req, requestCrud);
    });
};
