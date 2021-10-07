const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    cardName: String,
    cardId: String,
    date: String,
    numberInEdition: Number,
    circulation: Number,
    uploadCardThumbnail: String,
    uploadCardHighRes: String,
    type: 'Human' | 'Event' | 'Invention' | 'Artwork' | 'Special',
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary',
    rarityScore: Number,
    categories: Array,
    description: String,
    golden: Boolean,
    openseaLink: String,
    artist: String,
    animator: String,
    url: String,
  },
  { versionKey: false, timestamps: true },
);

const Card = mongoose.model('cardSchema', cardSchema);

module.exports = Card;
