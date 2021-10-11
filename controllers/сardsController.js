const CardModel = require('../model/schemas/cardSchema')

const get = async (req, res) => {
  const allCards = await CardModel.find({})
  return res.status(200).json({ allCardsCollection: allCards })
}

module.exports = {
  get,
}
