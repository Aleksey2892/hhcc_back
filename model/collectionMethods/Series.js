const SeriesModel = require('../../model/schemas/series')
const BaseMethods = require('./BaseMethods')

class SeriesMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }
}

module.exports = new SeriesMethods(SeriesModel)
