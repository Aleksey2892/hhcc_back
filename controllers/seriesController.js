const HttpCodes = require('../constants/httpCodes')
const Series = require('../model/collectionMethods/Series')

const seriesController = {
  async get(req, res, next) {
    const { resBuilder } = res

    try {
      const collection = await Series.getCollection()

      if (!collection.length) {
        return resBuilder.error({
          code: HttpCodes.NO_CONTENT,
          message: 'Series list is empty or server error',
        })
      }

      return resBuilder.success({ code: HttpCodes.OK, data: collection })
    } catch (e) {
      next(e)
    }
  },

  async update(req, res, next) {
    const {
      body = null,
      params: { id = null },
    } = req
    const { resBuilder } = res

    try {
      const updatedSeries = await Series.updateItem(id, body)

      if (!updatedSeries) {
        return resBuilder.error({
          code: HttpCodes.BAD_REQUEST,
          message: `Series with ${id} id was not updated or not found`,
        })
      }

      return resBuilder.updated({
        code: HttpCodes.OK,
        message: `Series with ${id} id was updated`,
        data: updatedSeries,
      })
    } catch (e) {
      next(e)
    }
  },
}

module.exports = seriesController
