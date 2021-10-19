const BaseController = require('./BaseController')
const Series = require('../model/collectionMethods/Series')

class SeriesController extends BaseController {
  constructor(options) {
    super(options)
  }
}

module.exports = new SeriesController({
  methodsName: Series,
  controllerName: 'Series',
})
