const CardModel = require('../../model/schemas/card')

class CardsMethods {
  getAll() {
    return CardModel.find({})
  }
  getCardById(cardId) {
    return CardModel.findById(cardId)
  }
}

module.exports = new CardsMethods()
