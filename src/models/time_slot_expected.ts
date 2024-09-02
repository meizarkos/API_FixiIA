import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { RefusedEstimate } from './refused_estimate';
import { timeSlotRefusedModelError } from '../messages';

export const ExpectedEstimateTimeSlotModel = (sequelize: Sequelize) => {
    return sequelize.define('refused_estimate_time_slot', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        refused_estimate_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: RefusedEstimate,
                key: 'uuid'
            }
        },
        slot: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 32],
                    msg: timeSlotRefusedModelError.slot.len
                },
                notEmpty: { msg: timeSlotRefusedModelError.slot.notEmpty },
                notNull: { msg: timeSlotRefusedModelError.slot.notNull }
            }
        },
    });
};

export const ExpectedEstimateTimeSlot = ExpectedEstimateTimeSlotModel(sequelize);

ExpectedEstimateTimeSlot.belongsTo(RefusedEstimate, {
  onDelete: 'CASCADE',
});