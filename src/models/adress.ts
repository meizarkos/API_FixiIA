import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { adressModelError } from '../messages';

export const AdressModel = (sequelize: Sequelize) => {
    return sequelize.define('adress', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: adressModelError.country.notEmpty },
                notNull: { msg: adressModelError.country.notNull },
                len: {
                  args: [1, 128],
                  msg: adressModelError.country.len
              }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: adressModelError.city.notEmpty },
                notNull: { msg: adressModelError.city.notNull },
                len: {
                    args: [1, 128],
                    msg: adressModelError.city.len
                }
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: adressModelError.location.notEmpty },
                notNull: { msg: adressModelError.location.notNull },
                len: {
                    args: [1, 256],
                    msg: adressModelError.location.len
                }
            }
        },
        postal_code:{
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: {
                  args: [0, 56],
                  msg: adressModelError.postal_code.len
              },
              notEmpty: { msg: adressModelError.postal_code.notEmpty },
              notNull: { msg: adressModelError.postal_code.notNull }
          }
        },
        region:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 128],
                    msg: adressModelError.region.len
                },
                notEmpty: { msg: adressModelError.region.notEmpty },
                notNull: { msg: adressModelError.region.notNull }
            }
        },
        comment:{
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              len: {
                  args: [0, 256],
                  msg: adressModelError.comment.len
              },
          }
      }
    });
};

export const Adress = AdressModel(sequelize);
