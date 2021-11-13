const { Schema, model } = require('mongoose')
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
      type: Schema.Types.ObjectId,
      ref: 'series',
    },
    cardNumber: {
      // X/21 (X is the number of the card, 21 - is autofielled from Number of series cards  )
      type: Number,
    },
    edition: {
      // autofield from edition
      type: Schema.Types.ObjectId,
      ref: 'editions',
    },
    circulation: {
      type: Number,
    },
    uploadCardThumbnailJpg: {
      // should be uploud only if goldenCard is true
      type: String,
      default: null,
    },
    idCloudJpg: {
      type: String,
      default: null,
    },
    uploadCardHighResWebm: {
      // should be uploud only if goldenCard is true
      type: String,
      default: null,
    },
    idCloudWebm: {
      type: String,
      default: null,
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
      default: null,
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
