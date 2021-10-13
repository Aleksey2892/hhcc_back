const { Schema, model } = require('mongoose')

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
  { versionKey: false, timestamps: true },
)

module.exports = model('faq', faqSchema, 'faq')
