const BaseController = require('./BaseController')
const Editions = require('../model/collectionMethods/Editions')

class EditionsController extends BaseController {
  constructor(options) {
    super(options)
  }
}

module.exports = new EditionsController({
  methodsName: Editions,
  controllerName: 'Edition',
})
