const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      //Soal 2. Confirm Password
      confirm_password: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('Confirm Password'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  //Soal 3. Change Password
  changePassword: {
    body: {
      email: joi.string().email().required().label('Email'),
      oldPassword: joi.string().min(6).required().label('Old Password'),
      newPassword: joi.string().min(6).required().label('New Password'),
      confirmPassword: joi.string()
        .valid(joi.ref('newPassword'))
        .required()
        .label('Confirm Password')
        .messages({ 'any.only': 'Passwords do not match' }),
    },
  },
};
