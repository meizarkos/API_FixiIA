import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { companyModelError } from '../messages';
import { Adress } from './adress';

export const CompanyModel = (sequelize: Sequelize) => {
    return sequelize.define('companie', {
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
                msg: companyModelError.email.unique_email_constraint
            },
            validate: {
                notEmpty: { msg: companyModelError.email.notEmpty },
                notNull: { msg: companyModelError.email.notNull },
                len: {
                    args: [0, 128], // Minimum and maximum length
                    msg: companyModelError.email.len
                },
                isEmail: { msg: companyModelError.email.isEmail }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: companyModelError.password.notEmpty },
                notNull: { msg: companyModelError.password.notNull }
            }
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: companyModelError.company_name.notEmpty },
                notNull: { msg: companyModelError.company_name.notNull },
                len: {
                    args: [1, 128],
                    msg: companyModelError.company_name.len
                }
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: companyModelError.location.notEmpty },
                notNull: { msg: companyModelError.location.notNull },
                len: {
                    args: [1, 128],
                    msg: companyModelError.location.len
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
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

export const Company = CompanyModel(sequelize);

Company.hasOne(Adress);