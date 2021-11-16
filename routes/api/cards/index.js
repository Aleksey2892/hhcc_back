const express = require('express')
const router = express.Router()
const {
  validationCreatedCard,
  validationUpdatedContact,
} = require('../../../validation/cards')
const CardsController = require('../../../controllers/СardsController')
const upload = require('../../../helpers/upload')

router
  .get('/cards/:editionId', CardsController.get)
  .post('/cards/:editionId', validationCreatedCard, CardsController.create)

router
  .get('/cards/:id', CardsController.getById)
  .put('/cards/:id', validationUpdatedContact, CardsController.update)
  .delete('/cards/:id', CardsController.remove)
  .patch('/cards/png/:id', upload.single('png'), CardsController.uploadPng)
  .patch('/cards/webm/:id', upload.single('webm'), CardsController.uploadWebm)

module.exports = router
