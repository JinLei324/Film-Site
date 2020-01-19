const { validationResult } = require('../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')



exports.requireUserId = [
    check('userId')
        .exists()
        .withMessage('User id required')
        .not()
        .isEmpty()
        .withMessage('User id cannot be blank'),

    (req, res, next) => {
        validationResult(req, res, next)
    }
]
exports.changeVideoStatus = [
    check('videoId')
        .exists()
        .withMessage('Video id required')
        .not()
        .isEmpty()
        .withMessage('Video id cannot be blank'),
    check('action')
        .exists()
        .withMessage('Action required ! eg. disabled,allowed,hide,is_featured')
        .isIn(['disabled', 'hide', 'allowed', 'is_featured']).withMessage('Valid options are - disabled,allowed,hide,is_featured'),
    check('action_value')
        .exists()
        .withMessage('Action value required !')
        .isIn([false, true]).withMessage('Valid options are boolean - true , false '),
    (req, res, next) => {
        validationResult(req, res, next)
    }
]

// .not().isIn(['disable', 'hide', 'approve', 'remove']).withMessage('Valid options are - disable,approve,hide,remove')
