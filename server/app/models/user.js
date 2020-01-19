const mongoose = require('mongoose')
var DateOnly = require('mongoose-dateonly')(mongoose);
const bcrypt = require('bcrypt-nodejs')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')


var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email'
    },
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  userDescription: {
    type: String,
    require: true
  },
  userTitle: {
    type: String,
    require: true
  },
  userId: {
    type: String,
    required: true
  },
  allowed: {
    type: Boolean,
    required: true,
    default: false
  },
  lock: {
    type: Boolean,
    required: true,
    default: true
  },
  newMessage: {
    type: Boolean,
    required: false,
    default: false
  },
  newNotification: {
    type: Boolean,
    required: false,
    default: false
  },
  images: {
    type: [String],
    required: false,
    default: []
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  versionKey: false,
  timestamps: true
})

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, null, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function (next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}
UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', UserSchema)
