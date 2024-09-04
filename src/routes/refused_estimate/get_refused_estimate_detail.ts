import { Request, Response, Application } from 'express';
import { refusedEstimateCrud } from '../../models/crud';
import { ExpectedEstimateTimeSlot } from '../../models';

/* eslint-disable */
export const getRefusedEstimateDetail= async (app: Application) => {
  app.get(`${refusedEstimateCrud.route}_detail/:estimate_id`, async (req: Request, res: Response) => {
    const refused = await refusedEstimateCrud.model.findOne({ where: { estimate_id: req.params.estimate_id } });
    if (!refused) {
      return;
    }
    const expectedTiming = await ExpectedEstimateTimeSlot.findAll({ where: { refused_estimate_id: refused.getDataValue('uuid') } });
    refused.setDataValue('timing_expected', expectedTiming);
    return res.status(200).json({ message: `Item found in ${refusedEstimateCrud.route}`, item: refused });
  });
};

