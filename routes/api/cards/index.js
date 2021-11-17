const express = require('express')
const router = express.Router()
const {
  validationCreatedCard,
  validationUpdatedCard,
} = require('../../../validation/cards')
const CardsController = require('../../../controllers/СardsController')
const upload = require('../../../helpers/upload')

router
  .get('/cards/:editionId', CardsController.get)
  .post(
    '/cards/:editionId',
    upload.single('file'),
    validationCreatedCard,
    CardsController.create,
  )

router
  .get('/cards/:id', CardsController.getById)
  .put('/cards/:id', validationUpdatedCard, CardsController.update)
  .delete('/cards/:id', CardsController.remove)
  .patch('/cards/png/:id', upload.single('file'), CardsController.uploadPng)
  .patch('/cards/webm/:id', upload.single('file'), CardsController.uploadWebm)

module.exports = router
