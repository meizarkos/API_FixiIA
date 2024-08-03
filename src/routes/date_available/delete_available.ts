import { availableDateCrud } from '../../models/crud';
import { Response,Request,Application } from 'express';
import { deleteFunc } from '../utilsCrudUser';

export const deleteAvaiableDate = (app: Application) => {
  app.delete(`${availableDateCrud.route}_id/:uuid`, async (req: Request, res: Response) => {
      deleteFunc(res,availableDateCrud,req.params.uuid);
  });
};  