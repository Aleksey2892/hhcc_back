const express = require('express')
const router = express.Router()
const {
  validationCreatedCard,
  validationUpdatedContact,
} = require('../../../validation/cards')
const cardsController = require('../../../controllers/cardsController')


router
  .get('/cards', cardsController.get)
  .post('/cards', validationCreatedCard, cardsController.create)

router
  .get('/cards/:id', cardsController.getById)
  .delete('/cards/:id', cardsController.remove)
  .put('/cards/:id', validationUpdatedContact, cardsController.update)

module.exports = router
