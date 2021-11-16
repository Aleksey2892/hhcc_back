const userModel = require('../schemas/user')
const BaseMethods = require('./BaseMethods')

class UsersMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }

  findByLogin(login) {
    return this.modelName.findOne({ login })
  }

  updateToken(id, token) {
    return this.modelName.updateOne({ _id: id }, { token })
  }
}

module.exports = new UsersMethods(userModel)
