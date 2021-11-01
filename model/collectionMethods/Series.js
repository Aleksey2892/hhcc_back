const seriesModel = require('../../model/schemas/series')
const BaseMethods = require('./BaseMethods')

class SeriesMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection() {
    return this.modelName.find({}).populate('editions')
  }
}

module.exports = new SeriesMethods(seriesModel)
