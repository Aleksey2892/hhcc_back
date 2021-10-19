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
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    ...optionsForSchemas,
  },
)

module.exports = model('series', seriesSchema)
