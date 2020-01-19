const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Video = require('../models/video')
const videoCtrl = require('../controllers/video')
const utils = require('../middleware/utils')
const uuid = require('uuid')
const {
    matchedData
} = require('express-validator')
const auth = require('../middleware/auth')
const emailer = require('../middleware/emailer')
var path = require('path')
const db = require('../middleware/db')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/*********************
 * Private functions *
 *********************/




/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const getPendingUsers = async => {
    return new Promise((resolve, reject) => {
        User.find({ "allowed": false },
            '_id name userTitle email userDescription allowed',
            (err, item) => {
                utils.itemNotFound(err, item, reject, 'No user found !')
                resolve(item)
            }
        )
    })
}

/**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findUserById = async userId => {
    return new Promise((resolve, reject) => {
        User.findById(userId, (err, item) => {
            utils.itemNotFound(err, item, reject, 'USER_DOES_NOT_EXIST')
            resolve(item)
        })
    })
}




/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = async (data, next) => {
    return new Promise((resolve, reject) => {
        User.findById(data.id, (err, result) => {
            utils.itemNotFound(err, result, reject, 'NOT_FOUND')
            if (data.roles.indexOf(result.role) > -1) {
                return resolve(next())
            }
            return reject(utils.buildErrObject(401, 'UNAUTHORIZED'))
        })
    })
}

/**
 * update approve status in db
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const approveUserById = async (req, id) => {

    return new Promise((resolve, reject) => {
        User.update(
            { _id: id },
            {
                $set: { allowed: true },
            }, (err, user) => {
                utils.itemNotFound(err, user, reject, 'NOT_FOUND')
                resolve(user)
            }

        )
    })
}

/*
     * --------------------------------------------------------------------------
     * @ Function Name            : doStatusChange()
     * @ Added Date               : 22-11-19
     * @ Added By                 : Amit
     * --------------------------------------------------------------------------
     * @ Description              : Dynamically update video status
     * --------------------------------------------------------------------------
     * @ return                   : response json format
     * --------------------------------------------------------------------------
     * @ Modified Date            :
     * @ Modified By              :
     *
    */
const doStatusChange = async (req, id) => {
    return new Promise((resolve, reject) => {
        var target = req.action_value;
        var field = req.action;
        var obj = {};
        obj[field] = target;
        Video.update(
            { _id: id },
            {
                $set: obj,
            }, (err, user) => {
                utils.itemNotFound(err, user, reject, 'NOT_FOUND')
                resolve(user)
            }

        )
    })
}

/*
     * --------------------------------------------------------------------------
     * @ Function Name            : masterVideoListService()
     * @ Type                     : Private
     * @ Added Date               : 22-11-19
     * @ Added By                 : Amit
     * --------------------------------------------------------------------------
     * @ Description              : this will provide list of videos on given condition
     * --------------------------------------------------------------------------
     * @ return                   : response json format
     * --------------------------------------------------------------------------
     * @ Modified Date            :
     * @ Modified By              :
     *
    */

const masterVideoListService = async cond => {
    var videos = await videoCtrl.masterVideoList(cond)
    var result = videos.map(function (el) {
        var o = Object.assign({}, el.toObject());
        o.videoUrl = utils.buildVideoUrl(el.video)
        o.posterUrl = utils.buildPosterUrl(el.poster)
        return o;
    })
    return result;
}



/********************
 * Public functions *
 ********************/
/********************** ADMIN USER SECTION APIS STARTS ********************************/

exports.sendMail = async (req, res) => {


    try {
        const msg = {
            to: 'apamitkpandit@gmail.com',
            from: 'test@example.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        const response = sgMail.send(msg);
        utils.handleSuccess(res, response, "Email sent successfullly")

    } catch {

    }


}

/*
     * --------------------------------------------------------------------------
     * @ Function Name            : adminLanding()
     * @ Added Date               : 22-11-19
     * @ Added By                 : Amit
     * --------------------------------------------------------------------------
     * @ Description              : All pending user list
     * --------------------------------------------------------------------------
     * @ return                   : response json format
     * --------------------------------------------------------------------------
     * @ Modified Date            : 
     * @ Modified By              : 
     *
    */

exports.pendingUserList = async (req, res) => {
    try {
        //const id = await utils.isIDGood(req.user._id)
        var users = await getPendingUsers()
        utils.handleSuccess(res, users, "List fetched successfull.")
    } catch (error) {
        utils.handleError(res, error)
    }
}


/*
     * --------------------------------------------------------------------------
     * @ Function Name            : approveUser()
     * @ Added Date               : 22-11-19
     * @ Added By                 : Amit
     * --------------------------------------------------------------------------
     * @ Description              : approve user by admin
     * --------------------------------------------------------------------------
     * @ return                   : response json format
     * --------------------------------------------------------------------------
     * @ Modified Date            :
     * @ Modified By              :
     *
    */

exports.approveUser = async (req, res) => {
    try {
        req = matchedData(req)
        const id = await utils.isIDGood(req.userId)
        await approveUserById(req, id)
        utils.handleSuccess(res, [], "User approved successfully.")
    } catch (error) {
        utils.handleError(res, error)
    }
}


/*
     * --------------------------------------------------------------------------
     * @ Function Name            : removeUser()
     * @ Added Date               : 22-11-19
     * @ Added By                 : Amit
     * --------------------------------------------------------------------------
     * @ Description              : delete user from system
     * --------------------------------------------------------------------------
     * @ return                   : response json format
     * --------------------------------------------------------------------------
     * @ Modified Date            :
     * @ Modified By              :
     *
    */

exports.removeUser = async (req, res) => {
    try {
        req = matchedData(req)
        const id = await utils.isIDGood(req.userId)
        await db.deleteItem(id, User)
        utils.handleSuccess(res, [], "User removed successfully.")
    } catch (error) {
        utils.handleError(res, error)
    }
}

/********************** ADMIN USER SECTION APIS STARTS ********************************/


/********************** ADMIN VIDEO RELATED APIS ********************************/


/*
* --------------------------------------------------------------------------
* @ Function Name            : allowedVideoList()
* @ Added Date               : 22-11-19
* @ Added By                 : Amit
* --------------------------------------------------------------------------
* @ Description              : All allowed video list (landing page)
* --------------------------------------------------------------------------
* @ return                   : response json format
* --------------------------------------------------------------------------
* @ Modified Date            : 
* @ Modified By              : 
*
*/

exports.allowedVideoList = async (req, res) => {
    try {
        const cond = {
            allowed: true,
            disabled: false,
            hide: false
        }
        const result = await masterVideoListService(cond)
        utils.handleSuccess(res, result, "List fetched successfully.")
    } catch (error) {
        utils.handleError(res, error)
    }
}


/*
* --------------------------------------------------------------------------
* @ Function Name            : chageVideoStatus()
* @ Added Date               : 22-11-19
* @ Added By                 : Amit
* --------------------------------------------------------------------------
* @ Description              : Chnage multiple status at once
* --------------------------------------------------------------------------
* @ return                   : response json format
* --------------------------------------------------------------------------
* @ Modified Date            :
* @ Modified By              :
*
*/

exports.chageVideoStatus = async (req, res) => {
    try {
        req = matchedData(req)
        const id = await utils.isIDGood(req.videoId)
        await doStatusChange(req, id)
        utils.handleSuccess(res, [], "Status updated successfully.")
    } catch (error) {
        utils.handleError(res, error)
    }
}



/*
* --------------------------------------------------------------------------
* @ Function Name            : videoRequests()
* @ Added Date               : 22-11-19
* @ Added By                 : Amit
* --------------------------------------------------------------------------
* @ Description              : List of videos that need to take action
                               eg.  non-allowed
* --------------------------------------------------------------------------
* @ return                   : response json format
* --------------------------------------------------------------------------
* @ Modified Date            : 
* @ Modified By              : 
*
*/

exports.videoRequests = async (req, res) => {
    try {
        const cond = {
            allowed: false
        }
        const result = await masterVideoListService(cond)
        utils.handleSuccess(res, result, "List fetched successfully.")
    } catch (error) {
        utils.handleError(res, error)
    }
}
