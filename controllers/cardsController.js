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
      const newCard = await Cards.create(req.body)
      return res
        .status(HttpCodes.CREATED)
        .json({ status: 'success', code: HttpCodes.CREATED, newCard })
    } catch (e) {
      next(e)
    }
  },
  async remove(req, res, next) {
    try {
      const removedCard = await Cards.removeCard(req.params.cardId)
      return res
        .status(HttpCodes.OK)
        .json({ status: 'success', code: HttpCodes.OK, removedCard })
    } catch (e) {
      next(e)
    }
  },
}

// const updateCard = async (req, res) => {
//   const updatedCard = await CardModel.findOneAndUpdate(
//     req.params.cardId,
//     req.body,
//   )
//   return res
//     .status(201)
//     .json({ status: 'success', code: 201, updatedCard: { updatedCard } })
// }

module.exports = cardsController
