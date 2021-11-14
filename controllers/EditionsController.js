const BaseController = require('./BaseController')
const Editions = require('../model/collectionMethods/Editions')
const Series = require('../model/collectionMethods/Series')
const HttpCodes = require('../constants/httpCodes')

class EditionsController extends BaseController {
  constructor(options) {
    super(options)
  }

  get = async (req, res, next) => {
    const {
      body = null,
      params: { seriesId = null },
    } = req
    const { resBuilder } = res

    try {
      const collection = await this.methodsName.getCollection(seriesId)

      if (!collection.length) {
        return resBuilder.error({
          code: HttpCodes.NOT_FOUND,
          message: `[${this.controllerName}] list is empty or server error!`,
        })
      }

      return resBuilder.success({
        code: HttpCodes.OK,
        data: collection,
      })
    } catch (e) {
      next(e)
    }
  }

  create = async (req, res, next) => {
    const {
      body = null,
      params: { seriesId = null },
    } = req
    const { resBuilder } = res
    body.series = seriesId

    try {
      const series = await Series.getById(seriesId)
      const newItem = await this.methodsName.createItem(body)

      if (series && newItem) {
        await Series.updateItem(seriesId, { $push: { editions: newItem._id } })
      }

      if (!newItem || !series) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: `[${this.controllerName}] was not created!`,
        })
      }

      return resBuilder.successCreated({
        code: HttpCodes.OK,
        message: `New [${this.controllerName}] was created`,
        data: newItem,
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new EditionsController({
  methodsName: Editions,
  controllerName: 'Edition',
})
