const express = require('express')

const router = express.Router()
const Photo = require('../models/photo-model')

router.get("/api/category/:name", (req, res) => {
  let category = req.params.name;
  Photo.find({category: category}, (err, photos) => {
    if (!err) {
      res.send(photos)
    } else {
      res.status(500).send(err)
    }
  })
})

module.exports = router