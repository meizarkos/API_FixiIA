import { Request, Response, Application } from 'express';
import { refusedEstimateCrud } from '../../models/crud';
import { Estimate, Request as RequestModel, TimingEstimate, ExpectedEstimateTimeSlot } from '../../models';
import { createFunctionId } from '../utilsCrudUser';
import { Model } from 'sequelize';

export const postEstimateRefused = (app: Application) => {
    app.post(`${refusedEstimateCrud.route}_id`, async (req: Request, res: Response) => {
        try {
            const estimateId = req.body.estimate_id;
            const requestId = req.body.request_id;
            const acceptTimeId = req.body.time_id;

            if (
                req.body.excepted_price == null &&
                req.body.excepted_duration == null &&
                req.body.expected_time == null &&
                acceptTimeId
            ) {
                await RequestModel.update({ status: 'Accepted' }, { where: { uuid: requestId } });
                await Estimate.update({ status: 'Accepted' }, { where: { uuid: estimateId } });
                await TimingEstimate.update({ status: 'Accepted' }, { where: { uuid: acceptTimeId } });
                return res.status(200).json({ message: `You accept the estimation` });
            } else {
                const listOfTiming = req.body.expected_time as string[];
                delete req.body.expected_time;
                delete req.body.request_id;
                delete req.body.time_id;
                await Estimate.update({ status: 'Refused' }, { where: { uuid: estimateId } });

                /* eslint-disable */
                const refused = (await createFunctionId(res, req, refusedEstimateCrud, true)) as Model<any, any>;

                if (!refused) {
                    return;
                }

                const refusedId = await refused.getDataValue('uuid');

                if (!listOfTiming || listOfTiming.length === 0) {
                    if (acceptTimeId) {
                        await TimingEstimate.update({ status: 'Accepted' }, { where: { uuid: acceptTimeId } });
                    } else {
                        throw new Error('Error no time id');
                    }
                } else {
                    Promise.all(
                        listOfTiming.map(async (time: string) => {
                            await ExpectedEstimateTimeSlot.create({
                                refused_estimate_id: refusedId,
                                slot: time
                            });
                        })
                    );
                }

                return res.status(200).json({ message: `Estimation refused create ${refusedId}` });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Error server', message: 'Error creating refused estimation.' });
        }
    });
};
