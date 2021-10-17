const cardModel = require('../../model/schemas/card')
const BaseMethods = require('./BaseMethods')

class CardsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }
}

module.exports = new CardsMethods(cardModel)
