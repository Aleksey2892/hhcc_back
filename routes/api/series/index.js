const express = require('express')
const router = express.Router()
const seriesController = require('../../../controllers/seriesController')

router.get('/series', seriesController.get)

router.put('/series/:id', seriesController.update)
// .get('/series/:id', seriesController.getById)
// .delete('/series/:id', seriesController.remove)

module.exports = router
