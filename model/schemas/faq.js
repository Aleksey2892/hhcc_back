const { Schema, model } = require('mongoose')
const { optionsForSchemas } = require('../../constants/options')

const faqSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
    },
  },
  {
    ...optionsForSchemas,
  },
)

module.exports = model('faq', faqSchema, 'faq')
