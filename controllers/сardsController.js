const cardModel = require('../model/schemas/cardModel')

const testCard = {
  cardName: '',
  cardId: '',
  date: '',
  numberInEdition: 0,
  circulation: 0,
  uploadCardThumbnail: '',
  uploadCardHighRes: '',
  type: 'Human',
  rarity: 'Common',
  rarityScore: 0,
  categories: [],
  description: '',
  golden: false,
  openseaLink: '',
  artist: '',
  animator: '',
  url: '',
}

const get = async (req, res) => {
  const allCards = await cardModel.find({})

  return res.status(200).json({ cards: [...allCards, testCard] })
}

module.exports = {
  get,
}
