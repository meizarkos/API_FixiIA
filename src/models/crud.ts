import { Model, ModelStatic } from 'sequelize';
import * as models from './index';

export type CrudAdmin = {
  model: ModelStatic<Model<any, any>>;
  route: string;
  forbidden: Array<string>;
  noReturn?: Array<string>;
  post? : boolean;
  patch? : boolean;
  delete? : boolean;
  get? : boolean;
  champNameToFillWithTokenId?: any;
  champNameToFindById?: any;
};

export const userCrud: CrudAdmin = {
  model: models.User,
  route: '/users',
  forbidden: ['uuid'],
  noReturn: ['password'],
  post: false,
};

export const companyCrud: CrudAdmin = {
  model: models.Company,
  route: '/companies',
  forbidden: ['uuid'],
  noReturn: ['password'],
  post: false,
};

export const availableDateCrud: CrudAdmin = {
  model: models.AvailableDate,
  route: '/available_dates',
  forbidden: ['uuid'],
  post: false,
}