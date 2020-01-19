const controller = require('../controllers/video')
const validate = require('../controllers/video.validate')
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
 * Uplaod video
 */
// router.post('/uplaodVideo',validate.uplaodVideo, controller.uplaodVideo)
router.post('/uploadVideo', requireAuth, controller.uplaodVideo)
router.get('/landingVideoList/:category?', controller.masterVideoList)
router.get('/searchVideos/:searchString?', controller.masterVideoList)




module.exports = router
