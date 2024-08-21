import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { adressCrud } from '../../models/crud';

export const postAdress = (app: Application) => {
    app.post(`${adressCrud.route}_id`, async (req: Request, res: Response) => {
        createFunctionId(res, req, adressCrud);
    });
};
