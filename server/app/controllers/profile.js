const model = require('../models/user')
const utils = require('../middleware/utils')
const { matchedData } = require('express-validator')
const auth = require('../middleware/auth')
const uuid = require('uuid')
var base64Img = require('base64-img');
var path = require('path')
var uploadPath = "public/uploads/images/"
/*********************
 * Private functions *
 *********************/

/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const getProfileFromDB = async id => {
  return new Promise((resolve, reject) => {
    model.findById(id, '-_id -updatedAt -createdAt -user_location -user_device_data', (err, user) => {
      utils.itemNotFound(err, user, reject, 'NOT_FOUND')
      resolve(user)
    })
  })
}

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
const updateProfileInDB = async (req, id) => {
  return new Promise((resolve, reject) => {
    model.update(
      { _id: id },
      {
        $addToSet: { images: { $each: ["i2m", "7e4", "9eee"] } }
      }, (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND')
        resolve(user)
      }

    )
  })
}

/**
 * Updates profile in database
 * @param {Object} req - request object
 * @param {string} id - user id
 */
exports.updateImages = async (req, id) => {
  console.log(req)
  return new Promise((resolve, reject) => {
    model.update(
      { _id: id },
      {
        $addToSet: { images: { $each: req } }
      }, (err, user) => {
        utils.itemNotFound(err, user, reject, 'NOT_FOUND')
        resolve(user)
      }

    )
  })
}


/********************
 * Public functions *
 ********************/

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getProfile = async (req, res) => {
  try {
    console.log(req)
    const id = await utils.isIDGood(req.user._id)
    const profileDate = await getProfileFromDB(id)

    utils.handleSuccess(res, profileDate, "Profile Details fetched successfully")
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateProfile = async (req, res) => {
  try {
    const id = await utils.isIDGood(req.user._id)
    req = matchedData(req)
    res.status(200).json(await updateProfileInDB(req, id))
  } catch (error) {
    utils.handleError(res, error)
  }
}

exports.uploadImages = async (req, res) => {
  try {
    let dataset = {};
    const id = await utils.isIDGood(req.user._id)
    req = matchedData(req)
    imagesPath = await handleUploadImages(req.images, id)
    dataset = { "img_url": imagesPath };
    utils.handleSuccess(res, dataset, "Image uploaded successfully")
    //res.status(200).json({ response: result })

  } catch (error) {
    utils.handleError(res, error)
  }
}

const handleUploadImages = async (images, id) => {
  return new Promise((resolve, reject) => {
    var img_arr = [];
    var resultImagePath = [];
    images.forEach(function (value) {
      let imageName = uuid.v4();
      response = base64Img.imgSync(value, uploadPath, imageName)
      if (response) {
        img_arr.push(imageName + path.extname(response))
        resultImagePath.push("localhost:8080/" + response)
      }
    })
    //save images name (array) in DB
    this.updateImages(img_arr, id)
    if (resultImagePath) {
      resolve(resultImagePath)
    }
  })
}