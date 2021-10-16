const FaqModel = require('../../model/schemas/faq')
const BaseMethods = require('./BaseMethods')

class FaqMethods extends BaseMethods {
  constructor(modelName) {
    super(modelName)
  }
}

module.exports = new FaqMethods(FaqModel)
