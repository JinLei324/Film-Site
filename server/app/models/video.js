const mongoose = require('mongoose')
const validator = require('validator')

var VideoSchema = new mongoose.Schema({
  allowed: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  comments: {
    type: [],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
  genere: {
    type: String,
    required: true
  },
  hide: {
    type: Boolean,
    required: true
  },
  likes: {
    type: [],
    required: false,
    default: []
  },
  video: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  // path: {
  //   type: String,
  //   required: false
  // },
  // poster: {
  //   type: String,
  //   required: false
  // },
  // posterStorageRef: {
  //   type: String,
  //   required: true
  // },
  rating: {
    type: String,
    required: true
  },
  series: {
    type: Boolean,
    required: false
  },
  seriesId: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: false
  },
  videoId: {
    type: String,
    required: false
  },
  is_featured: {
    type: Boolean,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  film_name: {
    type: String,
    require: true
  },
  play_count: {
    type: Number,
    require: false
  },
}, {
  versionKey: false,
  timestamps: true
})

VideoSchema.index({ userId: 1 })

VideoSchema.index({ title: "text", description: "text", category: "text", film_name: "text", genere: "text" })

module.exports = mongoose.model('videos', VideoSchema)
