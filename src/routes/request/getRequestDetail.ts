import { Request, Response, Application } from 'express';
import { Request as RequestModel } from '../../models/request';
import { Adress } from '../../models';

export const getRequestDetail = (app: Application) => {
    app.get(`/request_detail/:uuid`, async (req: Request, res: Response) => {
        const request = await RequestModel.findOne({ where: { uuid: req.params.uuid } });
        const address = await Adress.findOne({ where: { uuid: request.getDataValue('adress_id') } });
        res.status(200).json({ request, address });
    });
};
