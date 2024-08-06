import { getCrudByIdInToken } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { requestCrud } from '../../models/crud';
import { Request as RequestModel } from '../../models/request';
import { classByNewer,isDateInThePast } from '../../utils';

export const getRequestByNewer = (app: Application) => {
    app.get(`${requestCrud.route}_token`, async (req: Request, res: Response) => {
        const item = await getCrudByIdInToken(res, req, requestCrud);
        const classNewer = classByNewer(item);
        await Promise.all(classNewer.map(async (classNewer) => {
           if(classNewer.getDataValue('numberOfEstimate') === 0){
                if(isDateInThePast(classNewer.getDataValue('intervention_date'))){
                    classNewer.setDataValue('status', 'Outdated');
                    RequestModel.update({status: 'Outdated'}, {where: {uuid: classNewer.getDataValue('uuid')}});
                }
           }
           return classNewer;
        }));
        res.status(200).json({ message: `Item found in ${requestCrud.route}`, item: classNewer });
    });
};
