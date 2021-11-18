const BaseController = require('./BaseController')
const Faq = require('../model/collectionMethods/Faq')

class FaqController extends BaseController {}

module.exports = new FaqController({
  methodsName: Faq,
  controllerName: 'Faq',
})
