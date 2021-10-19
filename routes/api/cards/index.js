const express = require('express')
const router = express.Router()
const {
  validationCreatedCard,
  validationUpdatedContact,
} = require('../../../validation/cards')
const CardsController = require('../../../controllers/СardsController')


router
  .get('/cards', CardsController.get)
  .post('/cards', validationCreatedCard, CardsController.create)

router
  .get('/cards/:id', CardsController.getById)
  .put('/cards/:id', validationUpdatedContact, CardsController.update)
  .delete('/cards/:id', CardsController.remove)

module.exports = router
