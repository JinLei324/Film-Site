const videos = require('../models/video')
const uuid = require('uuid')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')
const emailer = require('../middleware/emailer')
const multer = require('multer');
const path = require('path');
const validate = require('../controllers/video.validate')

const destPath = {
  video: process.env.MEDIA_UPLOAD_PATH + "videos",
  poster: process.env.MEDIA_UPLOAD_PATH + "poster"
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (file.fieldname == 'videoFile') {
      cb(null, destPath.video)
    }
    if (file.fieldname == 'posterFile') {
      cb(null, destPath.poster)
    }

  },
  filename: function (req, file, cb) {

    if (file.fieldname == 'videoFile') {
      cb(null, uuid.v4() + path.extname(file.originalname))
    }
    if (file.fieldname == 'posterFile') {
      cb(null, uuid.v4() + path.extname(file.originalname))
    }

  }
})
const fileFilter = function (req, file, callback) {

  const validateResponse = validate.uplaodVideo(req.body)
  if (!validateResponse.flag) {
    return callback(new Error(validateResponse.msg), false);
  }
  if (file.fieldname === 'videoFile' && !file.originalname.match(/\.(mp4|flv|3gp|wmv|avi|mov|m4v)$/)) {
    return callback(new Error('Only video files are allowed!'), false);
  }
  if (file.fieldname === 'posterFile' && (!file.originalname.match(/\.(jpg|jpeg|png)$/))) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

var uplaod = multer({ storage: storage, fileFilter: fileFilter }).fields([{
  name: 'videoFile', maxCount: 1
}, {
  name: 'posterFile', maxCount: 1
}]);
/*********************
 * Private functions *
 *********************/

/**
 * master video list service (Just pass the condition object to get list)
 * @param {object} condition - condtion object
 */
exports.masterVideoList = async cond => {
  return new Promise((resolve, reject) => {
    videos.find(cond, (err, VideoList) => {
      utils.itemNotFound(err, VideoList, reject, 'No data found !')
      resolve(VideoList)
    })
  })
}





/**
 * saving upload video response in DB
 * @param {object} condition - condtion object
 */


const saveUplaodedResponse = async req => {
  return new Promise((resolve, reject) => {
    const video = new videos({
      // videoId: req.body.videoId,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      genere: req.body.genere,
      rating: req.body.rating,
      film_name: req.body.film_name,
      video: req.files.videoFile[0].filename,
      poster: req.files.posterFile[0].filename,
      comments: [],
      hide: false,
      disabled: false,
      allowed: true, // for now true default will be false
      likes: [],
      series: false,
      is_featured: false,
      userId: req.user._id,
      play_count: 0
    })
    video.save((err, item) => {
      if (err) {
        reject(utils.buildErrObject(422, err.message))
      }
      resolve(item)
    })
  }).catch(function (err) {
    return false
  })


}

/*
     * --------------------------------------------------------------------------
     * @ Function Name            : uplaodVideo()
     * @ Added Date               : 22-11-19
     * @ Added By                 : Amit
     * --------------------------------------------------------------------------
     * @ Description              : Uplaod videos and poster 
     * --------------------------------------------------------------------------
     * @ return                   : response json format
     * --------------------------------------------------------------------------
     * @ Modified Date            :
     * @ Modified By              :
     *
    */
exports.uplaodVideo = async (req, res) => {
  try {
    uplaod(req, res, async function (err) {
      if (!err) {
        const saved = await saveUplaodedResponse(req)
        if (!saved) {
          utils.handleError(res, 'oops something went wrong !')
        } else {
          utils.handleSuccess(res, saved, "video uploaded successfully");
        }
      } else {
        utils.handleError(res, err)
      }
    });
  } catch (error) {
    utils.handleError(res, error)
  }
}




/*
* --------------------------------------------------------------------------
* @ Function Name            : masterVideoList()
* @ Added Date               : 24-11-19
* @ Added By                 : Amit
* --------------------------------------------------------------------------
* @ Description              : For landing page for videos and categorywise
* --------------------------------------------------------------------------
* @ return                   : response json format
* --------------------------------------------------------------------------
* @ Modified Date            :
* @ Modified By              :
*
*/
exports.masterVideoList = async (req, res) => {
  try {

    var dataset = {
      featured: [],
      recommended: []
    }
    // const id = await utils.isIDGood(req.user._id)
    // Passing Match condition to DB query
    let matchCond = {
      $match: {
        allowed: true,
        disabled: false,
        hide: false,
      }
    }
    if (req.params.category) {
      matchCond.$match.category = req.params.category.trim();
    }

    // For searching vidoes
    if (req.params.searchString) {
      matchCond.$match.$text = { $search: req.params.searchString.trim() }
    }

    var videoList = await masterVideoLookupQuery(matchCond);
    var VideoObj = setVideoObj(videoList)
    // Featured&Recomended videos list filter

    if (!req.params.searchString) {
      var recommended = [];
      var featured = VideoObj.filter(vid => {
        if (vid.is_featured === true) {
          return vid;
        } else {
          recommended.push(vid)
        }
      });
      dataset = {
        featured: featured,
        recommended: recommended
      }
    } else {
      dataset = VideoObj;
    }
    utils.handleSuccess(res, dataset, "fetched successfully")
  } catch (error) {
    utils.handleError(res, error)
  }
}

const setVideoObj = req => {
  let result = req.map(function (el) {
    // var o = Object.assign({}, el.toObject());
    el.videoUrl = process.env.BASE_URL + '/uploads/videos/' + el.video;
    el.posterUrl = process.env.BASE_URL + '/uploads/poster/' + el.poster;
    el.user_details[0] = {
      "name": el.user_details[0].name,
      "userTitle": el.user_details[0].userTitle
    }
    return el;
  })

  return result;
}




/**
 * Gets profile from database by id
 * @param {string} id - user id
 */
const masterVideoLookupQuery = async (matchCond) => {
  return new Promise((resolve, reject) => {
    videos.aggregate([
      matchCond,
      {
        '$lookup': {
          'from': 'users',
          'localField': 'userObjId',
          'foreignField': 'id',
          'as': 'user_details'
        }
      }, {
        '$addFields': {
          'newField': {
            'userObjId': {
              '$toObjectId': '$_id'
            }
          }
        }
      },
      // {
      //   "$project": {
      //     "user_details.name": 1,
      //     "user_details.userDescription": 1,
      //     "user_details.images": 1
      //   }
      // },
      { $unset: ["newField", "userId", "createdAt", "updatedAt", "comments", "likes"] }
    ],
      (err, VideoList) => {
        utils.itemNotFound(err, VideoList, reject, 'No data found !')
        resolve(VideoList)
      })
  })
}
