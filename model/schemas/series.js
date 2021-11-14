const { Schema, model } = require('mongoose')
const { optionsForSchemas } = require('../../constants/options')

const seriesSchema = new Schema(
  {
    seriesName: {
      type: String,
      required: [true, 'series name is required'],
      unique: true,
    },
    totalCardsNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    urlLogo: {
      type: String,
      default: '',
    },
    editions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'editions',
      },
    ],
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'cards',
      },
    ],
  },

  {
    ...optionsForSchemas,
  },
)

module.exports = model('series', seriesSchema)
