const BaseController = require('./BaseController')
const Faq = require('../model/collectionMethods/Faq')

class FaqController extends BaseController {
  constructor(options) {
    super(options)
  }
}

module.exports = new FaqController({
  methodsName: Faq,
  controllerName: 'Faq',
})
