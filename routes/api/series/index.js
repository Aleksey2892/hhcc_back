const express = require('express')
const router = express.Router()
const SeriesController = require('../../../controllers/SeriesController')

router.get('/series', SeriesController.get)

router
  .put('/series/:id', SeriesController.update)
  .get('/series/:id', SeriesController.getById)

module.exports = router
