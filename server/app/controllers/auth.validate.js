const {
  validationResult
} = require('../middleware/utils')
const {
  check
} = require('express-validator')


exports.signUp = [
  check('name')
  .exists()
  .withMessage('Name is required')
  .not()
  .isEmpty()
  .withMessage('Name cannot be blank'),
  check('email')
  .exists()
  .withMessage('Email Required')
  .not()
  .isEmpty()
  .withMessage('Email Required')
  .isEmail()
  .withMessage('Invalid Email'),
  check('password')
  .exists()
  .withMessage('Password is required')
  .not()
  .isEmpty()
  .withMessage('Password cannot be blank'),
  check('userDescription')
  .exists()
  .withMessage('User Description is required')
  .not()
  .isEmpty()
  .withMessage('User Description cannot be blank'),
  check('userTitle')
  .exists()
  .withMessage('User Title is required')
  .not()
  .isEmpty()
  .withMessage('User Title cannot be blank'),
  check('userId')
  .exists()
  .withMessage('User Id is required')
  .not()
  .isEmpty()
  .withMessage('User Id cannot be blank'),

  (req, res, next) => {
    validationResult(req, res, next)
  }
]


/**
 * Validates login request
 */
exports.userSignIn = [
  check('userEmail')
  .exists()
  .withMessage('Email Required')
  .not()
  .isEmpty()
  .withMessage('Email cannot be blank')
  .isEmail()
  .withMessage('EMAIL_IS_NOT_VALID'),
  check('userPassword')
  .exists()
  .withMessage('Password required')
  .not()
  .isEmpty()
  .withMessage('Password cannot be blank'),
  (req, res, next) => {
    validationResult(req, res, next)
  }
]
