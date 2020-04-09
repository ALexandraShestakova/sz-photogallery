const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    required: true,
  },
  publishedBy: {
    type: Date,
    default: Date.now()
  },
  createdBy: {
    type: Date,
  },
})
module.exports = mongoose.model('Photo', PhotoSchema)