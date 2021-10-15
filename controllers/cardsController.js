const HttpCodes = require('../constants/httpCodes')
const Cards = require('../model/methods/Cards')

const cardsController = {
  async get(req, res, next) {
    const { resBuilder } = res

    try {
      const cardsCollection = await Cards.getCollection()

      if (!cardsCollection.length) {
        return resBuilder.error(
          HttpCodes.NOT_FOUND,
          'Cards list is empty or server error',
        )
      }

      return resBuilder.success(HttpCodes.OK, cardsCollection)
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
        return resBuilder.error(
          HttpCodes.NOT_FOUND,
          `Card with ${id} id was not found`,
        )
      }

      return resBuilder.success(HttpCodes.OK, cardById)
    } catch (e) {
      next(e)
    }
  },

  async create(req, res, next) {
    const { body = null } = req
    const { resBuilder } = res

    try {
      const newCard = await Cards.createCard(body)

      if (!newCard) {
        return resBuilder.error(HttpCodes.SERVER_ERROR, 'Card was not created!')
      }

      return resBuilder.success(HttpCodes.OK, newCard)
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
        return resBuilder.error(
          HttpCodes.SERVER_ERROR,
          `Card with ${id} id was not deleted or not found`,
        )
      }

      return resBuilder.deleted(
        HttpCodes.OK,
        removedCard,
        `Card with ${id} id was deleted`,
      )
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
      const updatedCard = await Cards.updateCard(id, body)

      if (!updatedCard) {
        return resBuilder.error(
          HttpCodes.BAD_REQUEST,
          `Card with ${id} id was not updated or not found`,
        )
      }

      return resBuilder.success(HttpCodes.OK, updatedCard)
    } catch (e) {
      next(e)
    }
  },
}

module.exports = cardsController
