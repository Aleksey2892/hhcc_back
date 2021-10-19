const express = require('express')
const router = express.Router()
const SeriesController = require('../../../controllers/seriesController')
const guard = require('../../../helpers/guard')

router.get('/series', guard, SeriesController.get)

router
  .put('/series/:id', guard, SeriesController.update)
  .get('/series/:id', guard, SeriesController.getById)

module.exports = router
