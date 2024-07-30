import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { userModelError } from '../messages';

export const UserModel = (sequelize: Sequelize) => {
    return sequelize.define('user', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'unique_email_constraint',
                msg: userModelError.email.unique_email_constraint
            },
            validate: {
                notEmpty: { msg: userModelError.email.notEmpty },
                notNull: { msg: userModelError.email.notNull},
                len: {
                    args: [0, 128], // Minimum and maximum length
                    msg: userModelError.email.len
                },
                isEmail: { msg: userModelError.email.isEmail }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: userModelError.password.notEmpty },
                notNull: { msg: userModelError.password.notNull }
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: userModelError.first_name.notEmpty },
                notNull: { msg: userModelError.first_name.notNull },
                len: {
                    args: [1, 128],
                    msg: userModelError.first_name.len
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: userModelError.last_name.notEmpty },
                notNull: { msg: userModelError.last_name.notNull },
                len: {
                    args: [1, 128],
                    msg: userModelError.last_name.len
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};

export const User = UserModel(sequelize);