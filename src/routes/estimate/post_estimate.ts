import { createFunctionId } from '../utilsCrudUser';
import { Request, Response, Application } from 'express';
import { estimateCrud } from '../../models/crud';
import { TimingEstimate, Request as RequestModel } from '../../models';
import { Model } from 'sequelize';

export const postEstimate = (app: Application) => {
    app.post(`${estimateCrud.route}_id`, async (req: Request, res: Response) => {
        const timing = req.body.timing;
        delete req.body.timing;

        /* eslint-disable */
        const estimate = (await createFunctionId(res, req, estimateCrud, true)) as Model<any, any>;

        if (estimate === null) return;

        await Promise.all(
            timing.map(async (time: number[]) => {
                const timeParse = `${time[0]}:${time[1]}:00`;
                await TimingEstimate.create({ time: timeParse, estimate_id: estimate.getDataValue('uuid') });
            })
        );

        
        await RequestModel.increment(
            { number_of_estimate:  1 },
            { where: { uuid: req.body.request_id } }
        );

        res.status(201).json({
            message: `Item created in ${estimateCrud.route} and timing created in timing_estimate`
        });
    });
};
