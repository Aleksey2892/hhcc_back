const editionModel = require('../schemas/edition')
const cardModel = require('../../model/schemas/card')
const BaseMethods = require('./BaseMethods')

class EditionsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection(seriesId) {
    return this.modelName
      .find({ series: seriesId })
      .populate({ path: 'cards', model: cardModel })
  }

  // updateItem(id, body) {
  //   return this.modelName.findOneAndUpdate(
  //     { _id: id },
  //     { ...body },
  //     { new: true },
  //   )
  // }
}

module.exports = new EditionsMethods(editionModel)
