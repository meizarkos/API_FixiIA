import { Request, Response, Application } from 'express';
import { estimateCrud,timingEstimateCrud } from '../../models/crud';
import { classByNewer } from '../../utils';
import { Request as RequestModel,Adress } from '../../models';

async function getEstimateForAll(app: Application, route: string, status: string) {
    app.get(`${estimateCrud.route}_all${route}`, async (req: Request, res: Response) => {
        const item = await estimateCrud.model.findAll({
            where: {
                company_id: req.jwt.payload.id,
                status : status
            }
        })

        if (item === null) {
            return;
        }

        const classNewer = classByNewer(item);

        for (let i = 0; i < classNewer.length; i++) {
            const timing = await timingEstimateCrud.model.findAll({
                where: {
                    estimate_id: classNewer[i].getDataValue('uuid')
                }
            });
            const request = await RequestModel.findByPk(classNewer[i].getDataValue('request_id'));
            const adrese = await Adress.findByPk(request.getDataValue('adress_id'));

            classNewer[i].setDataValue('timing', timing);
            classNewer[i].setDataValue('request', request);
            classNewer[i].getDataValue('request').setDataValue('adress', adrese);
          }
          res.status(200).json({ message: `Item found in ${estimateCrud.route}`, item: classNewer });
      });
    };

export const getAllPendingRequest = (app: Application) => {
    getEstimateForAll(app, '_pending', 'pending');
};    


    
