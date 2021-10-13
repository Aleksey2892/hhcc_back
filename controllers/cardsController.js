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
        : res.status(HttpCodes.OK).json({ status: HttpCodes.OK, responseData })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = cardsController
