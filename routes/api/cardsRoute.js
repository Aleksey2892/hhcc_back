const express = require('express')
const router = express.Router()
const cardsController = require('../../controllers/сardsController')

router
  .get('/cards', cardsController.get)
  .post('/cards', cardsController.createCard)

  
  router
  .get('/cards/:cardId', cardsController.getById)
  .delete('/cards/:cardId', cardsController.removeCard)
  //   .put('/cards/:cardId', cardsController.updateCard)

module.exports = router
