const express = require('express')
const router = express.Router()
const cardsController = require('../../../controllers/cardsController')

router.get('/cards', cardsController.get)

module.exports = router
