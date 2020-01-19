const {
  validationResult
} = require('../middleware/utils')
const {
  check, body
} = require('express-validator')


exports.uplaodVideo = (body) => {
  const res = { flag: true, msg: "" }
  if (!body.title || body.title == '') {
    return { flag: false, msg: "Title required !" }
  } else if (!body.category || body.category == '') {
    return { flag: false, msg: "Category required !" }
  } else if (!body.description || body.description == '') {
    return { flag: false, msg: "Description required !" }
  } else if (!body.rating || body.rating == '') {
    return { flag: false, msg: "Rating equired !" }
  } else if (!body.genere || body.genere == '') {
    return { flag: false, msg: "Genere required !" }
  } else if (!body.film_name || body.film_name == '') {
    return { flag: false, msg: "Film name required !" }
  } else if (!body.film_name || body.film_name == '') {
    return { flag: false, msg: "Film name required !" }
  } else {
    flag = true;
  }

  return res;





}