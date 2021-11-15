const express = require('express')
const router = express.Router()
const SeriesController = require('../../../controllers/seriesController')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router
  .get('/series', guard, SeriesController.get)
  .post('/series', upload.single('file'), guard, SeriesController.create)

router
  .put(
    '/series/:seriesId',
    upload.single('file'),
    guard,
    SeriesController.update,
  )
  .get('/series/:seriesId', guard, SeriesController.getById)

module.exports = router
