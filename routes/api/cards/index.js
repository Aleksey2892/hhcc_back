const express = require('express')
const router = express.Router()
const cardsController = require('../../../controllers/cardsController')
const {
  validationCreatedCard,
  validationUpdatedContact,
} = require('../../../validation/cards')

router
  .get('/cards', cardsController.get)
  .post('/cards', validationCreatedCard, cardsController.create)

router
  .get('/cards/:cardId', cardsController.getById)
  .delete('/cards/:cardId', cardsController.remove)
  .put('/cards/:cardId', validationUpdatedContact, cardsController.update)

module.exports = router
