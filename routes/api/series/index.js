const express = require('express')
const router = express.Router()
const seriesController = require('../../../controllers/seriesController')
const resBuilder = require('./SeriesResBuilder')

router.get('/series', resBuilder, seriesController.get)

module.exports = router
