import { patchUser } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { requestCrud } from '../../models/crud';

export const patchRequest = (app: Application) => {
    app.patch(`${requestCrud.route}_id/:uuid`, async (req: Request, res: Response) => {
        patchUser(res, req, requestCrud, req.params.uuid);
    });
};
