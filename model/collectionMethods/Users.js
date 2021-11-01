const userModel = require('../schemas/user')
const BaseMethods = require('./BaseMethods')

class UserMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  create(body) {
    return this.modelName.create(body)
  }

  findById(id) {
    return this.modelName.findById(id)
  }

  findByLogin(login) {
    return this.modelName.findOne({ login })
  }

  updateToken(id, token) {
    return this.modelName.updateOne({ _id: id }, { token })
  }
}

module.exports = new UserMethods(userModel)
