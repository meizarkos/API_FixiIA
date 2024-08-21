import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Estimate } from './estimate';
import { timingEstimateModelError } from '../messages';

export const TimingEstimateModel = (sequelize: Sequelize) => {
    return sequelize.define('timing_estimate', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        estimate_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Estimate,
                key: 'uuid'
            }
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: { msg: timingEstimateModelError.time.notEmpty },
                notNull: { msg: timingEstimateModelError.time.notNull }
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 32],
                    msg: timingEstimateModelError.status.len
                },
                notEmpty: { msg: timingEstimateModelError.status.notEmpty },
                notNull: { msg: timingEstimateModelError.status.notNull }
            },
            defaultValue: timingEstimateModelError.status.pending
        }
    });
};

export const TimingEstimate = TimingEstimateModel(sequelize);
