export const userModelError = {
    email: {
        unique_email_constraint: 'This email adress is already use',
        notEmpty: 'Email is a required field',
        notNull: 'Email is a required field',
        len: 'Email must be less than 128 characters',
        isEmail: 'Please use a valid email format'
    },
    password: {
        notEmpty: 'Password is required',
        notNull: 'Password is required'
    },
    first_name: {
        notEmpty: 'First name is required',
        notNull: 'First name is required',
        len: 'First name must be less than 128 characters'
    },
    last_name: {
        notEmpty: 'Last name is required',
        notNull: 'Last name is required',
        len: 'Last name must be less than 128 characters'
    }
};

export const companyModelError = {
    email: {
        unique_email_constraint: 'This email adress is already use',
        notEmpty: 'Email is a required field',
        notNull: 'Email is a required field',
        len: 'Email must be less than 128 characters',
        isEmail: 'Please use a valid email format'
    },
    password: {
        notEmpty: 'Password is required',
        notNull: 'Password is required'
    },
    company_name: {
        notEmpty: 'Company name is required',
        notNull: 'Company name is required',
        len: 'Company name must be less than 128 characters'
    },
    location: {
        notEmpty: 'A location is required',
        notNull: 'A location is required',
        len: 'Location text must be less than 128 characters'
    },
    adress: {
        notEmpty: 'An adress is required',
        notNull: 'An adress is required',
        len: 'Adress must be less than 256 characters'
    }
};

export const availableModelError = {
    date_available: {
        notEmpty: 'A date is required',
        notNull: 'A date is required'
    },
    status: {
        notEmpty: 'A status is required',
        notNull: 'A status is required'
    }
};

export const requestModelError = {
    category: {
        notEmpty: 'A category is required',
        notNull: 'A category is required',
        len: 'Category must be less than 128 characters'
    },
    title: {
        notEmpty: 'A title is required',
        notNull: 'A title is required',
        len: 'Title must be less than 128 characters'
    },
    description: {
        notEmpty: 'A description is required',
        notNull: 'A description is required',
        len: 'Description must be less than 1280 characters'
    },
    intervention_date: {
        notEmpty: 'A date is required',
        notNull: 'A date is required'
    },
    status: {
        notEmpty: 'A status is required',
        notNull: 'A status is required',
        pending: 'Pending',
        len: 'Status must be less than 128 characters'
    },
    adress: {
        notEmpty: 'An adress is required',
        notNull: 'An adress is required',
        len: 'Adress must be less than 256 characters'
    }
};

export const estimateModelError = {
    description: {
        notEmpty: 'A description is required',
        notNull: 'A description is required',
        len: 'Description must be less than 1280 characters'
    },
    price: {
        notEmpty: 'A price is required',
        notNull: 'A price is required',
        notPositive: 'Price must be positive and not 0'
    },
    intervention_date_start: {
        notEmpty: 'A date is required',
        notNull: 'A date is required'
    },
    intervention_date_end: {
        notEmpty: 'A date is required',
        notNull: 'A date is required'
    },
    commentary: {
        notEmpty: 'A commentary is required',
        notNull: 'A commentary is required',
        len: 'Commentary must be less than 1280 characters'
    },
    status: {
        notEmpty: 'A status is required',
        notNull: 'A status is required',
        pending: 'Pending',
        len: 'Status must be less than 128 characters'
    }
};

export const adressModelError = {
    country: {
        notEmpty: 'A country is required',
        notNull: 'A country is required',
        len: 'Country must be less than 128 characters'
    },
    city: {
        notEmpty: 'A city is required',
        notNull: 'A city is required',
        len: 'City must be less than 128 characters'
    },
    location: {
        notEmpty: 'An adress is required',
        notNull: 'An adress is required',
        len: 'Adress must be less than 256 characters'
    },
    postal_code: {
        notEmpty: 'A postal code is required',
        notNull: 'A postal code is required',
        len: 'Postal code must be less than 56 characters'
    },
    region: {
        notEmpty: 'A region is required',
        notNull: 'A region is required',
        len: 'Region must be less than 128 characters'
    },
    comment: {
        len: 'Comment must be less than 256 characters'
    }
};

export const timingEstimateModelError = {
    time: {
        notEmpty: 'A time is required',
        notNull: 'A time is required'
    },
    status: {
        notEmpty: 'A status is required',
        notNull: 'A status is required',
        pending: 'Pending',
        len: 'Status must be less than 32 characters'
    }
};

export const refusedEstimateModelError = {
    expected_price: {
        notPositive: 'Price must be positive and not 0',
        notFloat: 'Price must be a float'
    },
    expected_duration: {
        notInt: 'Duration must be an integer',
        notPositive: 'Duration must be positive and not 0'
    }
};

export const timeSlotRefusedModelError = {
    slot: {
        notEmpty: 'A slot is required',
        notNull: 'A slot is required',
        len: 'Slot must be less than 32 characters'
    }
};

export const loginError = {
    wrong_credentials: 'Vos identifiants sont incorrects'
};

export const errorOccured = {
    error_occured: 'Une erreur est survenue, réessayez plus tard'
};

export const noResult = {
    no_result: 'Aucun résultat'
};
