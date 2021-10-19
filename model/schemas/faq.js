const { Schema, model,SchemaTypes } = require('mongoose')

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

    user: {
      type: SchemaTypes.ObjectId, ref: 'user'
    }
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

module.exports = model('faq', faqSchema, 'faq')
