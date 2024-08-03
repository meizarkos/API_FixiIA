import { getCrudByIdInToken } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { requestCrud } from '../../models/crud';
import { classByNewer } from '../../utils';

export const getRequestByNewer = (app: Application) => {
    app.get(`${requestCrud.route}_token`, async (req: Request, res: Response) => {
        const item = await getCrudByIdInToken(res, req, requestCrud);
        const classNewer = classByNewer(item);
        res.status(200).json({ message: `Item found in ${requestCrud.route}`, item: classNewer });
    });
};
