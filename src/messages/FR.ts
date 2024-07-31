export const userModelError = {
  email: {
    unique_email_constraint: 'This email adress is already use',
    notEmpty: "Email is a required field",
    notNull: "Email is a required field",
    len: "Email must be less than 128 characters",
    isEmail: "Please use a valid email format"
  },
  password: {
    notEmpty: "Password is required",
    notNull: "Password is required"
  },
  first_name: {
    notEmpty: "First name is required",
    notNull: "First name is required",
    len: "First name must be less than 128 characters"
  },
  last_name: {
    notEmpty: "Last name is required",
    notNull: "Last name is required",
    len: "Last name must be less than 128 characters"
  }
}

export const companyModelError = {
  email: {
    unique_email_constraint: 'This email adress is already use',
    notEmpty: "Email is a required field",
    notNull: "Email is a required field",
    len: "Email must be less than 128 characters",
    isEmail: "Please use a valid email format"
  },
  password: {
    notEmpty: "Password is required",
    notNull: "Password is required"
  },
  company_name: {
    notEmpty: "Company name is required",
    notNull: "Company name is required",
    len: "Company name must be less than 128 characters"
  },
  location: {
    notEmpty: "A location is required",
    notNull: "A location is required",
    len: "Location text must be less than 128 characters"
  }
}

export const loginError = {
  wrong_credentials: "Vos identifiants sont incorrects",
}

export const errorOccured = {
  error_occured: "Une erreur est survenue, réessayez plus tard"
}

export const noResult = {
  no_result: "Aucun résultat"
}