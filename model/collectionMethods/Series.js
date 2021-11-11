const seriesModel = require('../../model/schemas/series')
const editionModel = require('../../model/schemas/edition')
const BaseMethods = require('./BaseMethods')

class SeriesMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection() {
    return this.modelName
      .find({})
      .populate({ path: 'editions', model: editionModel })
  }
}

module.exports = new SeriesMethods(seriesModel)
