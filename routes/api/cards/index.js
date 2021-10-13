const express = require('express')
const router = express.Router()
const cardsController = require('../../../controllers/cardsController')

router.get('/cards', cardsController.get).post('/cards', cardsController.create)

router
  .get('/cards/:cardId', cardsController.getById)
  .delete('/cards/:cardId', cardsController.remove)
//   .put('/cards/:cardId', cardsController.updateCard)

module.exports = router
