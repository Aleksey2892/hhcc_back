const { Schema, model } = require('mongoose')

const enums = {
  type: ['Human', 'Event', 'Invention', 'Artwork', 'Special'],
  rarity: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'],
}

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
      enum: enums.type,
      required: [true, `type is required of ${enums.type}`],
    },
    rarity: {
      type: String,
      enum: enums.rarity,
      required: [true, `type is required of ${enums.rarity}`],
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

module.exports = model('cards', cardSchema)
