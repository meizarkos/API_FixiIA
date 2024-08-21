import { Request, Response, Application } from 'express';
import { estimateCrud,timingEstimateCrud } from '../../models/crud';
import { classByNewer } from '../../utils';

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
            classNewer[i].setDataValue('timing', timing);
          }
          res.status(200).json({ message: `Item found in ${estimateCrud.route}`, item: classNewer });
      });
    };

export const getAllPendingRequest = (app: Application) => {
    getEstimateForAll(app, '_pending', 'pending');
};    


    
