const model = require('../models/user')
const utils = require('../middleware/utils')
const {
  matchedData
} = require('express-validator')
const auth = require('../middleware/auth')
