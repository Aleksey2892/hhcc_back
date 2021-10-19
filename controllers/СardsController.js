const BaseController = require('./BaseController')
const Cards = require('../model/collectionMethods/Cards')

class CardsController extends BaseController {
  constructor(options) {
    super(options)
  }
}

module.exports = new CardsController({
  methodsName: Cards,
  controllerName: 'Card',
})
