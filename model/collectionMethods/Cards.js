const cardModel = require('../../model/schemas/card')
const BaseMethods = require('./BaseMethods')

class CardsMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  getCollection(editionId) {
    return this.modelName.find({ edition: editionId })
  }

  updatePng(id, imgUrl, idCloudJpg = null) {
    return cardModel.findOneAndUpdate(
      { _id: id },
      { uploadCardThumbnailJpg: imgUrl, idCloudJpg },
      { new: true },
    )
  }

  updateWebm(id, webmUrl, idCloudWebm = null) {
    return cardModel.findOneAndUpdate(
      { _id: id },
      { uploadCardHighResWebm: webmUrl, idCloudWebm },
      { new: true },
    )
  }

  deleteMany(arrayOfObjToDelete) {
    return this.modelName.deleteMany({
      _id: { $in: arrayOfObjToDelete },
    })
  }
}

module.exports = new CardsMethods(cardModel)
