const { Schema, model, SchemaTypes } = require('mongoose')
const { card } = require('../../constants/enums')
const { optionsForSchemas } = require('../../constants/options')

const cardTypesOptions = Object.values(card.CardTypes)
const cardRarityOptions = Object.values(card.CardRarity)

const cardSchema = new Schema(
  {
    cardName: {
      type: String,
      required: [true, 'card name is required'],
      unique: true,
    },
    cardDate: {
      // format - year-month-day
      type: Date,
    },
    series: {
      // autofield from series Name
      type: SchemaTypes.ObjectId,
      ref: 'series',
    },
    cardNumber: {
      // X/21 (X is the number of the card, 21 - is autifielled from Number of series cards  )
      type: Number,
    },
    edition: {
      // autofield from edition
      type: SchemaTypes.ObjectId,
      ref: 'editions',
    },
    circulation: {
      type: Number,
    },
    uploadCardThumbnailJpg: {
      // should be uploud only if goldenCard is true
      type: String,
    },
    uploadCardHighResWebm: {
      // should be uploud only if goldenCard is true
      type: String,
    },
    type: {
      type: String,
      enum: cardTypesOptions,
      required: [true, `type is required of ${cardRarityOptions}`],
    },
    rarity: {
      type: String,
      enum: cardRarityOptions,
      required: [true, `type is required of ${cardRarityOptions}`],
    },
    categories: {
      type: Array,
      default: [],
      set: data => (!data ? [] : data),
    },
    description: {
      type: String,
    },
    goldenCard: {
      // if true upload uploadCardThumbnailJpg, uploadCardHighResWebm and upload Golden Card link on OpenSea
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
  },
  {
    ...optionsForSchemas,
  },
)

module.exports = model('cards', cardSchema)
