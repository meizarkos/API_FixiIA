import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { refusedEstimateModelError, requestModelError } from '../messages';
import { Estimate } from './estimate';

export const RefusedEstimateModel = (sequelize: Sequelize) => {
    return sequelize.define('refused_estimate', {
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
                key: 'uuid',
            }
        },
        expected_price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate:{
                isFloat: { msg:refusedEstimateModelError.expected_price.notFloat},
                notNegative: (value: number) => {
                  if (value <= 0) {
                      throw new Error(refusedEstimateModelError.expected_price.notPositive);
                  }
              },
            }
        },
        expected_duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate:{
              isInt: { msg: refusedEstimateModelError.expected_duration.notInt},
              notNegative: (value: number) => {
                if (value <= 0) {
                    throw new Error(refusedEstimateModelError.expected_duration.notPositive);
                }
            },
          }
        },
    });
};

export const RefusedEstimate = RefusedEstimateModel(sequelize);

RefusedEstimate.belongsTo(Estimate, {
    foreignKey: 'estimate_id',
    onDelete: 'CASCADE'
});