const controller = require('../controllers/main')
//const validate = require('../controllers/cities.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')


/*
 * Get items route
 */
// router.get(
//     '/getUserList',
//     requireAuth,
//     AuthController.roleAuthorization(['user']),
//     trimRequest.all,
//     controller.getUserList
// )


module.exports = router
