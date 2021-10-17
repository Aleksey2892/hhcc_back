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
      default: 21,
    },
    urlLogo: {
      type: String,
      default: '',
    },
  },
  {
    ...optionsForSchemas,
  },
)

module.exports = model('series', seriesSchema)
