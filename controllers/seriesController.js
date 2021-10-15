const Series = require('../model/methods/Series')
const HttpCodes = require('../constants/httpCodes')

const seriesController = {
  async get(req, res, next) {
    const { resBuilder } = res

    try {
      const collection = await Series.getCollection()

      if (!collection.length) {
        return resBuilder.error(HttpCodes.NO_CONTENT, 'Item list is empty')
      }

      return resBuilder.success(HttpCodes.OK, collection)
    } catch (e) {
      next(e)
    }
  },
}

module.exports = seriesController
