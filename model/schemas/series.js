const { Schema, model, SchemaTypes } = require('mongoose')
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
      default: 21,
    },
    urlLogo: {
      type: String,
      default: '',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    editions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'editions',
      },
    ],
  },

  {
    ...optionsForSchemas,
  },
)

module.exports = model('series', seriesSchema)
