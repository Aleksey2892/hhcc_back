const editionModel = require('../schemas/edition')
const BaseMethods = require('./BaseMethods')

class EditionsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection() {
    return this.modelName.find({}).populate('series')
  }
}

module.exports = new EditionsMethods(editionModel)
