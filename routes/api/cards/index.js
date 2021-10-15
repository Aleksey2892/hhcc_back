const express = require('express')
const router = express.Router()
const cardsController = require('../../../controllers/cardsController')
const {
  validationCreatedCard,
  validationUpdatedContact,
} = require('../../../validation/cards')
const resBuilder = require('./CardsResBuilder')

router
  .get('/cards', resBuilder, cardsController.get)
  .post('/cards', validationCreatedCard, resBuilder, cardsController.create)

router
  .get('/cards/:id', resBuilder, cardsController.getById)
  .delete('/cards/:id', resBuilder, cardsController.remove)
  .put(
    '/cards/:id',
    validationUpdatedContact,
    resBuilder,
    cardsController.update,
  )

module.exports = router
