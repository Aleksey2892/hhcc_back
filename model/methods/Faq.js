const FaqModel = require('../../model/schemas/faq')

class FaqMethods {
  getAll() {
    return FaqModel.find()
  }
}

module.exports = new FaqMethods()
