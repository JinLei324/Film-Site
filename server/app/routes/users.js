const controller = require('../controllers/users')
const validate = require('../controllers/users.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')


module.exports = router


//router.post('/searchVideos', controller.searchVideosList)