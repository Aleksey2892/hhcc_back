const editionModel = require('../schemas/edition')
const BaseMethods = require('./BaseMethods')

class EditionsMethods extends BaseMethods {
  getCollection(seriesId) {
    return this.modelName.find({ series: seriesId })
  }
}

module.exports = new EditionsMethods(editionModel)
