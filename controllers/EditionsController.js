const BaseController = require('./BaseController')
const Editions = require('../model/collectionMethods/Editions')
const HttpCodes = require('../constants/httpCodes')

class EditionsController extends BaseController {
  constructor(options) {
    super(options)
  }

  create = async (req, res, next) => {
    const { body = null } = req
    const { resBuilder } = res

    body.owner = '6168afcb36aa10991efb43e4'

    try {
      const newItem = await this.methodsName.createItem(body)

      if (!newItem) {
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
