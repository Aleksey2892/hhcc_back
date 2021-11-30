const express = require('express')
const router = express.Router()
const EditionsController = require('./Edition.controller')
const guard = require('../../helpers/guard')

router
  .get('/editions/:seriesId', EditionsController.get)
  .post('/editions/:seriesId', guard, EditionsController.create)

router
  .get('/edition/:editionId', EditionsController.getById)
  .delete('/edition/:editionId', guard, EditionsController.remove)

module.exports = router
