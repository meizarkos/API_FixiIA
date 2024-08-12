import { patchUser } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { adressCrud } from '../../models/crud';

export const patchAdress = (app: Application) => {
    app.patch(`${adressCrud.route}_id/:uuid`, async (req: Request, res: Response) => {
      patchUser(res,req,adressCrud,req.params.uuid)
    });
};
