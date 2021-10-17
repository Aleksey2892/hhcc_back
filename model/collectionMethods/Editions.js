const editionModel = require('../schemas/edition')
const BaseMethods = require('./BaseMethods')

class EditionsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }
}

module.exports = new EditionsMethods(editionModel)
