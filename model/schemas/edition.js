const { Schema, model } = require('mongoose')
const { optionsForSchemas } = require('../../constants/options')

const editionSchema = new Schema(
  {
    editionName: {
      type: String,
      required: [true, 'editionName is required'],
    },
  },
  {
    ...optionsForSchemas,
  },
)

module.exports = model('edition', editionSchema, 'edition')
