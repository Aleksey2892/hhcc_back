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
  .get('/card/:id', CardsController.getById)
  .put('/card/:id', validationUpdatedCard, CardsController.update)
  .delete('/card/:id', CardsController.remove)
  .patch('/card/png/:id', upload.single('file'), CardsController.uploadPng)
  .patch('/card/webm/:id', upload.single('file'), CardsController.uploadWebm)

module.exports = router
