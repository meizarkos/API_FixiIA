import { Request, Response, Application } from 'express';
import { estimateCrud, timingEstimateCrud } from '../../models/crud';
import { classByNewer } from '../../utils';
import { Request as RequestModel, Adress, RefusedEstimate, ExpectedEstimateTimeSlot } from '../../models';
import { tokenText } from '../../middleware/token';

/* eslint-disable */
async function getEstimateForAll(app: Application, route: string, status: string, whereToFindId: any) {
    app.get(`${estimateCrud.route}_all${route}`, async (req: Request, res: Response) => {
        const item = await estimateCrud.model.findAll({
            where: {
                [whereToFindId]: req[tokenText].id,
                status: status
            }
        });

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

        return res.status(200).json({ message: `Item found in ${estimateCrud.route}`, item: classNewer });
    });
}

export const getAllPendingRequest = async (app: Application) => {
    await getEstimateForAll(app, '_pending', 'pending', 'company_id');
};

export const getAllAcceptedRequest = async (app: Application) => {
    await getEstimateForAll(app, '_accepted', 'accepted', 'company_id');
};

export const getAllRejectedRequest = async (app: Application) => {
    await getEstimateForAll(app, '_refused', 'refused', 'company_id');
};

export const getAllPendingEstimate = async (app: Application) => {
    await getEstimateForAll(app, '_pending_user', 'pending', 'user_id');
};

export const getAllAcceptedEstimate = async (app: Application) => {
    await getEstimateForAll(app, '_accepted_user', 'accepted', 'user_id');
};

export const getAllRejectedEstimate = async (app: Application) => {
    await getEstimateForAll(app, '_refused_user', 'refused', 'user_id');
};
