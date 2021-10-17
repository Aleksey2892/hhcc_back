const express = require('express')
const router = express.Router()
const EditionsController = require('../../../controllers/EditionsController')

router
  .get('/editions', EditionsController.get)
  .post('/editions', EditionsController.create)

router.delete('/editions/:id', EditionsController.remove)

module.exports = router
