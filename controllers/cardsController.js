const HttpCodes = require('../constants/httpCodes')
const Cards = require('../model/collectionMethods/Cards')

module.exports = {
  async get(req, res, next) {
    const { resBuilder } = res

    try {
      const cardsCollection = await Cards.getCollection()

      if (!cardsCollection.length) {
        return resBuilder.error({
          code: HttpCodes.NOT_FOUND,
          message: 'Cards list is empty or server error',
        })
      }

      return resBuilder.success({
        code: HttpCodes.OK,
        data: cardsCollection,
      })
    } catch (e) {
      next(e)
    }
  },

  async getById(req, res, next) {
    const { id = null } = req.params
    const { resBuilder } = res

    try {
      const cardById = await Cards.getById(id)

      if (!cardById) {
        return resBuilder.error({
          code: HttpCodes.NOT_FOUND,
          message: `Card with ${id} id was not found`,
        })
      }

      return resBuilder.success({ code: HttpCodes.OK, data: cardById })
    } catch (e) {
      next(e)
    }
  },

  async create(req, res, next) {
    const { body = null } = req
    const { resBuilder } = res

    try {
      const newCard = await Cards.createItem(body)

      if (!newCard) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: 'Card was not created!',
        })
      }

      return resBuilder.created({
        code: HttpCodes.OK,
        message: 'New card was created',
        data: newCard,
      })
    } catch (e) {
      next(e)
    }
  },

  async remove(req, res, next) {
    const { id = null } = req.params
    const { resBuilder } = res

    try {
      const removedCard = await Cards.removeItem(id)

      if (!removedCard) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: `Card with ${id} id was not deleted or not found`,
        })
      }

      return resBuilder.deleted({
        code: HttpCodes.OK,
        message: `Card with ${id} id was deleted`,
        data: removedCard,
      })
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
      const updatedCard = await Cards.updateItem(id, body)

      if (!updatedCard) {
        return resBuilder.error({
          code: HttpCodes.BAD_REQUEST,
          message: `Card with ${id} id was not updated or not found`,
        })
      }

      return resBuilder.updated({
        code: HttpCodes.OK,
        message: `Card with ${id} id was updated`,
        data: updatedCard,
      })
    } catch (e) {
      next(e)
    }
  },
}
