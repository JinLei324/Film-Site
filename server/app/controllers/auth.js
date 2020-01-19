const jwt = require('jsonwebtoken')
const User = require('../models/user')
const UserAccess = require('../models/userAccess')
const utils = require('../middleware/utils')
const uuid = require('uuid')
const {
  matchedData
} = require('express-validator')
const auth = require('../middleware/auth')
const emailer = require('../middleware/emailer')
var base64Img = require('base64-img');
var path = require('path')
var uploadPath = "public/uploads/images/"
const imageUpdateService = require('./profile')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
/*********************
 * Private functions *
 *********************/

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = user => {
  // Gets expiration time
  const expiration =
    Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign({
      data: {
        _id: user
      },
      exp: expiration
    },
      process.env.JWT_SECRET
    )
  )
}

/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = req => {
  let user = {
    _id: req._id,
    name: req.name,
    email: req.email,
    role: req.role,
  }

  return user
}
/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = async (req, user) => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email,
      ip: utils.getIP(req),
      browser: utils.getBrowserInfo(req),
      country: utils.getCountry(req)
    })
    userAccess.save(err => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      const userInfo = setUserInfo(user)
      // Returns data with access token
      resolve({
        token: generateToken(user._id),
        user: userInfo
      })
    })
  })
}



/**
 * Finds user by email
 * @param {string} email - user´s email
 */
const findUser = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({
      email
    },
      'name email allowed role lock password',
      (err, item) => {
        utils.itemNotFound(err, item, reject, 'Invalid user details !')
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
 * Registers a new user in database
 * @param {Object} req - request object
 */
const saveNewUser = async req => {
  return new Promise((resolve, reject) => {
    const user = new User({
      name: req.name,
      email: req.email,
      password: req.password,
      userDescription: req.userDescription,
      userTitle: req.userTitle,
      userId: req.userId,
      allowed: true,
      lock: req.lock,
      newMessage: req.newMessage,
      newNotification: req.newNotification
    })
    user.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const returnRegisterToken = (item, userInfo) => {
  const data = {
    token: generateToken(item._id),
    user_data: userInfo
  }
  return data
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
 * Gets user id from token
 * @param {string} token - Encrypted and encoded token
 */
const getUserIdFromToken = async token => {
  return new Promise((resolve, reject) => {
    // Decrypts, verifies and decode token
    jwt.verify(auth.decrypt(token), process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(utils.buildErrObject(409, 'BAD_TOKEN'))
      }
      resolve(decoded.data._id)
    })
  })
}

/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getRefreshToken = async (req, res) => {
  try {
    const tokenEncrypted = req.headers.authorization
      .replace('Bearer ', '')
      .trim()
    let userId = await getUserIdFromToken(tokenEncrypted)
    userId = await utils.isIDGood(userId)
    const user = await findUserById(userId)
    const token = await saveUserAccessAndReturnToken(req, user)
    // Removes user info from response
    delete token.user
    res.status(200).json(token)
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
exports.roleAuthorization = roles => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    }
    await checkPermissions(data, next)
  } catch (error) {
    utils.handleError(res, error)
  }
}

const handleUploadImages = async (imagesUrl, id) => {
  return new Promise((resolve, reject) => {
    //var imagesUrl = 'https://via.placeholder.com/300.jpg';
    base64Img.requestBase64(imagesUrl, function (err, res, body) {
      if (body) {
        imagesArr = [body];
        var img_arr = [];
        imagesArr.forEach(function (value) {
          let imageName = uuid.v4();
          response = base64Img.imgSync(value, uploadPath, imageName)
          if (response) {
            img_arr.push(imageName + path.extname(response))
          }
        })
        //save images name (array) in DB
        imageUpdateService.updateImages(img_arr, id)
        if (img_arr) {
          resolve(img_arr)
        }
      }

    });
  })
}
/********************
 * Public functions *
 ********************/



/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.social_login = async (req, res) => {
  try {
    req = matchedData(req)
    console.log(req)
    const doesUserExist = await findUser(req.email)
    if (!doesUserExist) {
      const doesEmailExists = await emailer.emailExists(req.email)
      if (!doesEmailExists) {
        //if new user
        const item = await saveNewUser(req)
        const userInfo = setUserInfo(item)
        await handleUploadImages(req.image_url, item._id)
        const userData = returnRegisterToken(item, userInfo)
        //emailer.sendRegistrationEmailMessage(locale, item)
        utils.handleSuccess(res, userData, "Login Successfully")
      }
    } else {
      // if user exist then login
      const userInfo = setUserInfo(doesUserExist)
      const userData = returnRegisterToken(doesUserExist, userInfo)
      utils.handleSuccess(res, userData, "Login Successfully")
    }

  } catch (error) {
    utils.handleError(res, error)
  }
}

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
//  film-api


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.signUp = async (req, res) => {
  try {
    req = matchedData(req)
    const doesEmailExists = await emailer.emailExists(req.email)
    if (!doesEmailExists) {
      //if new user
      const item = await saveNewUser(req)
      const userInfo = setUserInfo(item)
      //emailer.sendRegistrationEmailMessage(locale, item)
      utils.handleSuccess(res, userInfo, "Sign-up Successfully")
    } else {
      utils.handleError(res, [], "User with this email is already exist !")
    }


  } catch (error) {
    utils.handleError(res, error)
  }
}


/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.userSignin = async (req, res) => {
  try {
    const data = matchedData(req)
    const user = await findUser(data.userEmail)

    await userIsAllowed(user)
    // await checkLoginAttemptsAndBlockExpires(user)
    const isPasswordMatch = await auth.checkPassword(data.userPassword, user)
    if (!isPasswordMatch) {
      utils.handleError(res, "Invalid Credentials, Please try again")
    } else {
      await saveLoginAttemptsToDB(user)
      const loginRes = await saveUserAccessAndReturnToken(req, user);
      utils.handleSuccess(res, loginRes, "Sign-in Successfully");
    }
  } catch (error) {
    utils.handleError(res, error)
  }
}


/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const userIsAllowed = async (data, next) => {
  return new Promise((resolve, reject) => {
    User.findById(data.id, (err, result) => {
      utils.itemNotFound(err, result, reject, 'NOT_FOUND')
      if (!data.allowed) {
        reject(utils.buildErrObject(422, "Account Is Pending"))
      }
      resolve(true)

    })
  })
}
/**
 * Saves login attempts to dabatabse
 * @param {Object} user - user object
 */
const saveLoginAttemptsToDB = async user => {
  return new Promise((resolve, reject) => {
    user.save((err, result) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      if (result) {
        resolve(true)
      }
    })
  })
}