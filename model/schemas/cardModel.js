const { Schema, model } = require('mongoose')

const enumType = ['Human', 'Event', 'Invention', 'Artwork', 'Special']
const enumRarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']

const cardSchema = new Schema(
  {
    cardName: {
      type: String,
      required: [true, 'card name is required'],
    },
    date: {
      type: String,
    },
    numberInEdition: {
      type: Number,
    },
    circulation: {
      type: Number,
    },
    uploadCardThumbnail: {
      type: String,
    },
    uploadCardHighRes: {
      type: String,
    },
    type: {
      type: String,
      enum: enumType,
      required: [true, `type is required of ${enumType}`],
    },
    rarity: {
      type: String,
      enum: enumRarity,
      required: [true, `type is required of ${enumRarity}`],
    },
    rarityScore: {
      type: Number,
    },
    categories: {
      type: Array,
      set: data => (!data ? [] : data),
    },
    description: {
      type: String,
    },
    golden: {
      type: Boolean,
      default: false,
    },
    openseaLink: {
      type: String,
    },
    artist: {
      type: String,
    },
    animator: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
)

const Card = model('cardSchema', cardSchema)

module.exports = Card
