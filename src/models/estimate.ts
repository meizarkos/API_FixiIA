import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { User } from './user';
import { Company } from './company';
import { Request } from './request';
import { estimateModelError } from '../messages';

export const EstimateModel = (sequelize: Sequelize) => {
    return sequelize.define('estimate', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: User,
              key: 'uuid'
            },
        },
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Company,
              key: 'uuid'
            },
        },
        request_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
              model: Request,
              key: 'uuid'
            },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: {
                args: [0, 1280],
                msg: estimateModelError.description.len
              },
              notEmpty: { msg: estimateModelError.description.notEmpty },
              notNull: { msg: estimateModelError.description.notNull },
          }
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notPositive: { msg: estimateModelError.price.notPositive },
                notEmpty: { msg: estimateModelError.price.notEmpty },
                notNull: { msg: estimateModelError.price.notNull },
            }
        },
        intervention_date_start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: estimateModelError.intervention_date_start.notEmpty },
                notNull: { msg: estimateModelError.intervention_date_start.notNull },
            }
        },
        intervention_date_end: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: { msg: estimateModelError.intervention_date_end.notEmpty },
                notNull: { msg: estimateModelError.intervention_date_end.notNull },
            }
        },
        commentary :{
            type: DataTypes.STRING,
            validate : {
              len: {
                args: [0, 1280],
                msg: estimateModelError.commentary.len
              },
              notEmpty: { msg: estimateModelError.commentary.notEmpty },
              notNull: { msg: estimateModelError.commentary.notNull },
            },
            allowNull: true
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                  args: [0, 128],
                  msg: estimateModelError.status.len
                },
                notEmpty: { msg: estimateModelError.status.notEmpty },
                notNull: { msg: estimateModelError.status.notNull },
            },
            defaultValue: estimateModelError.status.pending
        }
    });
};

export const Estimate = EstimateModel(sequelize);