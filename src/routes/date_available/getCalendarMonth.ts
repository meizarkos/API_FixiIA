import { AvailableDate } from '../../models';
import { Application, Request, Response } from 'express';
import { getStartAndEndOfMonth } from '../../utils';
import { Op } from 'sequelize';

export const getMonthToComeAllAvailable = (app: Application) => {
    app.get('/monthAvailable', async (req: Request, res: Response) => {
        try {
            const tokenId = req.jwt.payload.id;
            const { startOfYear, endOfYear } = getStartAndEndOfMonth();

            const allAvailableInMonth = await AvailableDate.findAll({
                where: {
                    company_id: tokenId,
                    available_date: {
                        [Op.between]: [startOfYear, endOfYear]
                    }
                },
                attributes: { exclude: ['company_id'] }
            });

            res.status(200).json(allAvailableInMonth);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
