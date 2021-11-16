const seriesModel = require('../../model/schemas/series')
const editionModel = require('../../model/schemas/edition')
const cardModel = require('../../model/schemas/card')
const BaseMethods = require('./BaseMethods')

class SeriesMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection() {
    return this.modelName.find({}).populate({
      path: 'editions',
      model: editionModel,
      populate: [{ path: 'cards', model: cardModel }],
    })
  }
}

module.exports = new SeriesMethods(seriesModel)
