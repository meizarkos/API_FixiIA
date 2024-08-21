import { getAllFromCrud, getCrudById } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { requestCrud, adressCrud } from '../../models/crud';
import { classByNewer, isDateInThePast } from '../../utils';

export const getAllRequestIfDateOk = (app: Application) => {
    app.get(`${requestCrud.route}_all`, async (req: Request, res: Response) => {
        const item = await getAllFromCrud(res, requestCrud);

        if (item === null) {
            return;
        }

        const classNewer = classByNewer(item);

        for (let i = 0; i < classNewer.length; i++) {
            if (isDateInThePast(classNewer[i].getDataValue('intervention_date'))) {
                classNewer.splice(i, 1);
                i--;
            } else {
                const adresse = await getCrudById(res, adressCrud, classNewer[i].getDataValue('adress_id'));

                if (adresse === null) {
                    return;
                }

                classNewer[i].setDataValue('city', adresse.getDataValue('city'));
            }
        }

        res.status(200).json({ message: `Item found in ${requestCrud.route}`, item: classNewer });
    });
};
