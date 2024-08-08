import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { User } from './user';
import { requestModelError } from '../messages';
import { Adress } from './adress';

export const RequestModel = (sequelize: Sequelize) => {
    return sequelize.define('request', {
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
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 128],
                    msg: requestModelError.category.len
                },
                notEmpty: { msg: requestModelError.category.notEmpty },
                notNull: { msg: requestModelError.category.notNull }
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 128],
                    msg: requestModelError.title.len
                },
                notEmpty: { msg: requestModelError.title.notEmpty },
                notNull: { msg: requestModelError.title.notNull }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 1280],
                    msg: requestModelError.description.len
                },
                notEmpty: { msg: requestModelError.description.notEmpty },
                notNull: { msg: requestModelError.description.notNull }
            }
        },
        intervention_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: requestModelError.intervention_date.notEmpty },
                notNull: { msg: requestModelError.intervention_date.notNull }
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 128],
                    msg: requestModelError.status.len
                },
                notEmpty: { msg: requestModelError.status.notEmpty },
                notNull: { msg: requestModelError.status.notNull }
            },
            defaultValue: requestModelError.status.pending
        },
        number_of_estimate :{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        adress_id :{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Adress,
                key: 'uuid'
            }
        }
    });
};

export const Request = RequestModel(sequelize);

Request.hasOne(Adress);
