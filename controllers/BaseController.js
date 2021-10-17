const HttpCodes = require('../constants/httpCodes')

module.exports = class BaseController {
  constructor(options) {
    const { methodsName, controllerName } = options
    this.methodsName = methodsName
    this.controllerName = controllerName
  }

  get = async (req, res, next) => {
    try {
      const { resBuilder } = res
      const collection = await this.methodsName.getCollection()

      if (!collection.length) {
        return resBuilder.error({
          code: HttpCodes.NOT_FOUND,
          message: `"${this.controllerName}" list is empty or server error`,
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

  getById = async (req, res, next) => {
    const { id = null } = req.params
    const { resBuilder } = res

    try {
      const foundItemById = await this.methodsName.getById(id)

      if (!foundItemById) {
        return resBuilder.error({
          code: HttpCodes.NOT_FOUND,
          message: `"${this.controllerName}" with ${id} id was not found`,
        })
      }

      return resBuilder.success({ code: HttpCodes.OK, data: foundItemById })
    } catch (e) {
      next(e)
    }
  }

  create = async (req, res, next) => {
    const { body = null } = req
    const { resBuilder } = res

    try {
      const newItem = await this.methodsName.createItem(body)

      if (!newItem) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: `"${this.controllerName}" was not created!`,
        })
      }

      return resBuilder.created({
        code: HttpCodes.OK,
        message: `New "${this.controllerName}" was created!`,
        data: newItem,
      })
    } catch (e) {
      next(e)
    }
  }

  update = async (req, res, next) => {
    const {
      body = null,
      params: { id = null },
    } = req
    const { resBuilder } = res

    try {
      const updatedItem = await this.methodsName.updateItem(id, body)

      if (!updatedItem) {
        return resBuilder.error({
          code: HttpCodes.BAD_REQUEST,
          message: `"${this.controllerName}" with ${id} id was not updated or not found`,
        })
      }

      return resBuilder.updated({
        code: HttpCodes.OK,
        message: `"${this.controllerName}" with ${id} id was updated`,
        data: updatedItem,
      })
    } catch (e) {
      next(e)
    }
  }

  remove = async (req, res, next) => {
    const { id = null } = req.params
    const { resBuilder } = res

    try {
      const removedItem = await this.methodsName.removeItem(id)

      if (!removedItem) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: `"${this.controllerName}" with ${id} id was not deleted or not found`,
        })
      }

      return resBuilder.deleted({
        code: HttpCodes.OK,
        message: `"${this.controllerName}" with ${id} id was deleted`,
        data: removedItem,
      })
    } catch (e) {
      next(e)
    }
  }
}
