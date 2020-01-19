const { validationResult } = require('../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')



exports.base64Image = [
  check('images')
    .exists()
    .withMessage('Images Field required')
    .not()
    .isEmpty()
    .withMessage('Images cannot be blank'),

  (req, res, next) => {
    validationResult(req, res, next)
  }
]