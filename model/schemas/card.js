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
    cardDate: {
      // format - year-month-day
      type: Date,
    },
    series: {
      // autofield from series Name
      type: String,
    },
    cardNumber: {
      // X/21 (X is the number of the card, 21 - is autifielled from Number of series cards  )
      type: Number,
    },
    edition: {
      // autofield from edition
      type: Number,
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
      required: [true, `type is required of ${enums.type}`],
    },
    rarity: {
      type: String,
      required: [true, `type is required of ${enums.rarity}`],
    },
    categories: {
      type: Array,
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
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
  },
)

module.exports = model('cards', cardSchema)
