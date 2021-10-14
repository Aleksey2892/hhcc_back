const CardModel = require('../../model/schemas/card')

class CardsMethods {
  getCollection() {
    return CardModel.find({})
  }
  getCardById(cardId) {
    return CardModel.findOne({ _id: cardId })
  }
  createCard(body) {
    return CardModel.create(body)
  }
  removeCard(cardId) {
    return CardModel.findOneAndRemove({ _id: cardId })
  }
  updateCard(cardId, body) {
    return CardModel.findOneAndUpdate(
      { _id: cardId },
      { ...body },
      { new: true },
    )
  }
}

module.exports = new CardsMethods()
