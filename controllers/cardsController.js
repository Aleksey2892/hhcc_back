const HttpCodes = require('../constants/httpCodes')
const Cards = require('../model/methods/Cards')

const cardsController = {
  async get(req, res, next) {
    const { resBuilder } = res

    try {
      const cardsCollection = await Cards.getCollection()

      return !cardsCollection
        ? resBuilder.error(HttpCodes.NO_CONTENT, 'ID not found')
        : resBuilder.success(HttpCodes.OK, cardsCollection)
    } catch (e) {
      next(e)
    }
  },

  async getById(req, res, next) {
    const { cardId = null } = req.params
    const { resBuilder } = res

    try {
      const cardById = await Cards.getCardById(cardId)

      return !cardById
        ? resBuilder.error(HttpCodes.NO_CONTENT, 'ID not found')
        : resBuilder.success(HttpCodes.OK, cardById)
    } catch (e) {
      next(e)
    }
  },

  async create(req, res, next) {
    const { body = null } = req
    const { resBuilder } = res

    try {
      const newCard = await Cards.createCard(body)

      return !newCard
        ? resBuilder.error(HttpCodes.SERVER_ERROR, 'Card not created!')
        : resBuilder.success(HttpCodes.OK, newCard)
    } catch (e) {
      next(e)
    }
  },

  async remove(req, res, next) {
    const { cardId = null } = req.params
    const { resBuilder } = res

    try {
      const removedCard = await Cards.removeCard(cardId)

      !removedCard
        ? resBuilder.error(HttpCodes.SERVER_ERROR, 'Card not found')
        : resBuilder.deleted(HttpCodes.OK, 'Card deleted!', removedCard)
    } catch (e) {
      next(e)
    }
  },

  async update(req, res, next) {
    const {
      body = null,
      params: { cardId = null },
    } = req
    const { resBuilder } = res

    try {
      const updatedCard = await Cards.updateCard(cardId, body)

      !updatedCard
        ? resBuilder.error(HttpCodes.BAD_REQUEST, 'Not found!')
        : resBuilder.success(HttpCodes.OK, updatedCard)
    } catch (e) {
      next(e)
    }
  },
}

module.exports = cardsController
