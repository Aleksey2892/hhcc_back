const CardModel = require('../../model/schemas/card')
const BaseMethods = require('./BaseMethods')

class CardsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  //TODO refactor and move to BaseMethods
  createCard(body) {
    return this.modelName.create(body)
  }

  //TODO refactor and move to BaseMethods
  updateCard(id, body) {
    return this.modelName.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    )
  }
}

module.exports = new CardsMethods(CardModel)
