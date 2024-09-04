import { Request, Response, Application } from 'express';
import { refusedEstimateCrud } from '../../models/crud';
import { Estimate, Request as RequestModel, TimingEstimate, ExpectedEstimateTimeSlot } from '../../models';
import { createFunctionId } from '../utilsCrudUser';
import { Model } from 'sequelize';
import { status, post_refused_estimate } from '../../messages/FR';

export const postEstimateRefused = (app: Application) => {
    app.post(`${refusedEstimateCrud.route}_id`, async (req: Request, res: Response) => {
        try {
            const estimateId = req.body.estimate_id;
            const requestId = req.body.request_id;
            const acceptTimeId = req.body.time_id;

            if (
                req.body.expected_price == null &&
                req.body.expected_duration == null &&
                req.body.expected_time == null &&
                acceptTimeId
            ) {
                await RequestModel.update({ status: status.accepted }, { where: { uuid: requestId } });
                await Estimate.update({ status: status.accepted }, { where: { uuid: estimateId } });
                await TimingEstimate.update({ status: status.accepted }, { where: { uuid: acceptTimeId } });
                return res.status(200).json({ message: post_refused_estimate.you_accept_the_estimation });
            } else {
                const listOfTiming = req.body.expected_time as string[];
                delete req.body.expected_time;
                delete req.body.request_id;
                delete req.body.time_id;
                await Estimate.update({ status: status.refused }, { where: { uuid: estimateId } });

                /* eslint-disable */
                const refused = (await createFunctionId(res, req, refusedEstimateCrud, true)) as Model<any, any>;

                if (!refused) {
                    return;
                }

                const refusedId = await refused.getDataValue('uuid');

                if (!listOfTiming || listOfTiming.length === 0) {
                    if (acceptTimeId) {
                        await TimingEstimate.update({ status: status.accepted }, { where: { uuid: acceptTimeId } });
                    } else {
                        throw new Error(post_refused_estimate.error_no_time_id);
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

                return res.status(200).json({ message: `${post_refused_estimate.estimation_refused_create} ${refusedId}` });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Error server', message: post_refused_estimate.error_creating_refused_estimation });
        }
    });
};
