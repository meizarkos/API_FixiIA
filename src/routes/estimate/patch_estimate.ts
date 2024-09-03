import { Request, Response, Application } from 'express';
import { estimateCrud } from '../../models/crud';
import { patchUser } from '../utilsCrudUser';

export const patchEstimate = (app: Application) => {
    app.patch(`${estimateCrud.route}_patch/:uuid`, async (req: Request, res: Response) => {
        patchUser(res, req, estimateCrud, req.params.uuid);
    });
};
