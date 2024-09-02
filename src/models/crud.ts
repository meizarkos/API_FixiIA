import { Model, ModelStatic } from 'sequelize';
import * as models from './index';

export type CrudAdmin = {
    /* eslint-disable */
    model: ModelStatic<Model<any, any>>;
    route: string;
    forbidden: Array<string>;
    noReturn?: Array<string>;
    post?: boolean;
    patch?: boolean;
    delete?: boolean;
    get?: boolean;
    champNameToFillWithTokenId?: string;
    champNameToFindById?: string;
};

export const userCrud: CrudAdmin = {
    model: models.User,
    route: '/users',
    forbidden: ['uuid'],
    noReturn: ['password'],
    post: false
};

export const companyCrud: CrudAdmin = {
    model: models.Company,
    route: '/companies',
    forbidden: ['uuid'],
    noReturn: ['password'],
    post: false
};

export const availableDateCrud: CrudAdmin = {
    model: models.AvailableDate,
    route: '/available_dates',
    forbidden: ['uuid'],
    post: false
};

export const requestCrud: CrudAdmin = {
    model: models.Request,
    route: '/requests',
    forbidden: ['uuid'],
    //post: false,
    champNameToFindById: 'user_id',
    champNameToFillWithTokenId: 'user_id'
};

export const estimateCrud: CrudAdmin = {
    model: models.Estimate,
    route: '/estimates',
    forbidden: ['uuid'],
    champNameToFindById: 'company_id',
    champNameToFillWithTokenId: 'company_id'
};

export const adressCrud: CrudAdmin = {
    model: models.Adress,
    route: '/adresses',
    forbidden: ['uuid'],
};

export const timingEstimateCrud: CrudAdmin = {
    model: models.TimingEstimate,
    route: '/timing_estimates',
    forbidden: ['uuid'],
};

export const refusedEstimateCrud: CrudAdmin = {
    model: models.RefusedEstimate,
    route: '/refused_estimates',
    forbidden: ['uuid'],
};

export const timeSlotRefusedCrud: CrudAdmin = {
    model: models.ExpectedEstimateTimeSlot,
    route: '/time_slot_refused',
    forbidden: ['uuid'],
};
