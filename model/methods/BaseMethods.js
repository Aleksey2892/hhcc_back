module.exports = class BaseMethods {
  modelName
  constructor(modelName) {
    this.modelName = modelName
  }

  getCollection() {
    return this.modelName.find({})
  }

  getById(id) {
    return this.modelName.findOne({ _id: id })
  }

  removeItem(id) {
    return this.modelName.findOneAndRemove({ _id: id })
  }
}
