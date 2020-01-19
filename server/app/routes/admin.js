const controller = require('../controllers/admin')
const validate = require('../controllers/admin.validate')
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

router.get('/pendingUserList', controller.pendingUserList)
router.post('/approveUser', validate.requireUserId, controller.approveUser)
router.post('/removeUser', validate.requireUserId, controller.removeUser)

router.get('/allowedVideoList', controller.allowedVideoList)
router.post('/changeVideoStatus', validate.changeVideoStatus, controller.chageVideoStatus)

router.get('/videoRequests', controller.videoRequests)
