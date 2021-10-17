const BaseController = require('./BaseController')
const Faq = require('../model/collectionMethods/Faq')

class FaqController extends BaseController {
  constructor(options) {
    const { methodsName, controllerName } = options
    super({ methodsName, controllerName })
  }
}

module.exports = new FaqController({
  methodsName: Faq,
  controllerName: 'Faq',
})
