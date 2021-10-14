const HttpCodes = require('../constants/httpCodes')
const Cards = require('../model/methods/Cards')

const cardsController = {
  async get(req, res, next) {
    const { id = null } = req.body
    try {
      let responseData
      !id
        ? (responseData = await Cards.getAll())
        : (responseData = await Cards.getCardById(id))

      return !responseData
        ? res.status(HttpCodes.BAD_REQUEST)
        : res
            .status(HttpCodes.OK)
            .json({ status: 'success', code: HttpCodes.OK, responseData })
    } catch (e) {
      next(e)
    }
  },
  async getById(req, res, next) {
    try {
      const cardById = await Cards.getCardById2(req.params.cardId)
      return res
        .status(HttpCodes.OK)
        .json({ status: 'success', code: HttpCodes.OK, cardById })
    } catch (e) {
      next(e)
    }
  },
  async create(req, res, next) {
    try {
      const newCard = await Cards.createCard(req.body)
      return res
        .status(HttpCodes.CREATED)
        .json({ status: 'success', code: HttpCodes.CREATED, data: { newCard } })
    } catch (e) {
      next(e)
    }
  },
  async remove(req, res, next) {
    try {
      const removedCard = await Cards.removeCard(req.params.cardId)
      if (!removedCard) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: 'error',
          code: HttpCodes.NOT_FOUND,
          message: 'Card not found!',
        })
      }
      return res.status(HttpCodes.OK).json({
        status: 'success',
        code: HttpCodes.OK,
        message: 'Card deleted!',
      })
    } catch (e) {
      next(e)
    }
  },
  async update(req, res, next) {
    try {
      const updatedCard = await Cards.updateCard(req.params.cardId, req.body)

      if (!updatedCard) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: 'error',
          code: HttpCodes.NOT_FOUND,
          message: 'Not found!',
        })
      }
      return res
        .status(HttpCodes.OK)
        .json({ status: 'succes', code: HttpCodes.OK, updatedCard })
    } catch (e) {
      next(e)
    }
  },
}

module.exports = cardsController
