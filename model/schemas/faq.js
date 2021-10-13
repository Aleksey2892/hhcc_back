const { Schema, model } = require('mongoose')

const faqSchema = new Schema(
  {
    question1: { type: { Q: String, A: String }, required: true },
    question2: { type: { Q: String, A: String }, required: true },
    question3: { type: { Q: String, A: String }, required: true },
    question4: { type: { Q: String, A: String }, required: true },
    question5: { type: { Q: String, A: String }, required: true },
  },
  { versionKey: false, timestamps: true },
)

module.exports = model('faq', faqSchema)
