const editionModel = require('../schemas/edition')
const cardModel = require('../../model/schemas/card')
const BaseMethods = require('./BaseMethods')

class EditionsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection() {
    return this.modelName.find({}).populate({ path: 'cards', model: cardModel })
  }
}

module.exports = new EditionsMethods(editionModel)
