const CardModel = require('../model/schemas/cardSchema')
const { HttpCodes } = require('../constants/httpCodes')

const get = async (req, res) => {
  const allCards = await CardModel.find({})
  return res.status(HttpCodes.OK).json({ allCardsCollection: allCards })
}

const getById = async (req, res) => {
  const cardById = await CardModel.findOne({ _id: req.params.cardId })
  return res
    .status(HttpCodes.OK)
    .json({ status: 'success', code: 201, cardById })
}

const createCard = async (req, res) => {
  const newCard = await CardModel.create(req.body)
  return res
    .status(HttpCodes.CREATED)
    .json({ status: 'success', code: 201, newCard })
}

const removeCard = async (req, res) => {
  const removedCard = await CardModel.findOneAndRemove({
    _id: req.params.cardId,
  })
  return res
    .status(HttpCodes.OK)
    .json({ status: 'success', code: 201, removedCard })
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

module.exports = {
  get,
  getById,
  createCard,
  removeCard,
}
