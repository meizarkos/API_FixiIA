import { deleteFunc, deleteFuncId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { requestCrud, adressCrud } from '../../models/crud';
import { Request as RequestModel } from '../../models';

export const deleteRequestAndAdress = (app: Application) => {
    app.delete(`${requestCrud.route}_id/:uuid`, async (req: Request, res: Response) => {
      try{
        const request = await RequestModel.findOne({ where: { uuid: req.params.uuid } });
        const resDel = deleteFuncId(res, requestCrud, req.params.uuid);
        if(resDel) return;
        console.log(request.getDataValue('adress_id'));
        const resDelAdress = deleteFuncId(res, adressCrud, request.getDataValue('adress_id'));
        console.log(resDelAdress);
        if(resDelAdress) return;
        res.status(200).json({ message: `Item deleted from ${requestCrud.route} and ${adressCrud.route}` });
      }
      catch(e: unknown){
        console.error(e);
        res.status(500).json({ error: 'Error in the server', message: 'Error deleting item.' });
      } 
    });
};
