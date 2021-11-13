const express = require('express')
const router = express.Router()
const EditionsController = require('../../../controllers/EditionsController')

router
  .get('/editions/:seriesId', EditionsController.get)
  .post('/editions/:seriesId', EditionsController.create)

router.delete('/editions/:editionId', EditionsController.remove)

module.exports = router
