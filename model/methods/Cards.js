const CardModel = require('../../model/schemas/card')

class CardsMethods {
  getAll() {
    return CardModel.find({})
  }
  getCardById(cardId) {
    return CardModel.findById(cardId)
  }
  getCardById2(cardId) {
    return CardModel.findOne({ _id: cardId })
  }
  removeCard(cardId) {
    return CardModel.findOneAndRemove({ _id: cardId })
  }
}

module.exports = new CardsMethods()
