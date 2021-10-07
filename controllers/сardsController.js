const exampleCard = {
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
};

const get = async (req, res) => {
  res.status(200).json({ cards: [] });
};

module.exports = {
  get,
};
