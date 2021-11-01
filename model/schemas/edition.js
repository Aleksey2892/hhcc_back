const { Schema, model, SchemaTypes } = require('mongoose')
const { optionsForSchemas } = require('../../constants/options')

const editionSchema = new Schema(
  {
    editionName: {
      type: String,
      required: [true, 'editionName is required'],
    },
    series: {
      type: Schema.Types.ObjectId,
      ref: 'series',
    },
  },

  {
    ...optionsForSchemas,
  },
)

module.exports = model('editions', editionSchema, 'editions')
