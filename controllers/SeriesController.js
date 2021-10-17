const BaseController = require('./BaseController')
const Series = require('../model/collectionMethods/Series')

class SeriesController extends BaseController {
  constructor(options) {
    const { methodsName, controllerName } = options
    super({ methodsName, controllerName })
  }
}

module.exports = new SeriesController({
  methodsName: Series,
  controllerName: 'Series',
})
