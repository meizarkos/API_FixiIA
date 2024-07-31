import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Company } from './company';
import { availableModelError } from '../messages';

export const AvailableDateModel = (sequelize: Sequelize) => {
    return sequelize.define('available_date', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Company,
              key: 'uuid'
            },
        },
        available_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: availableModelError.date_available.notEmpty },
                notNull: { msg: availableModelError.date_available.notNull },
            }
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: availableModelError.status.notEmpty },
                notNull: { msg: availableModelError.status.notNull },
            },
        }
    });
};

export const AvailableDate = AvailableDateModel(sequelize);