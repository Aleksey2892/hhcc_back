const BaseController = require('./BaseController')
const Cards = require('../model/collectionMethods/Cards')

class CardsController extends BaseController {
  constructor(options) {
    const { methodsName, controllerName } = options
    super({ methodsName, controllerName })
  }
}

module.exports = new CardsController({
  methodsName: Cards,
  controllerName: 'Cards',
})
