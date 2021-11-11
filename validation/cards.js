const Joi = require('joi')
const HttpCodes = require('../constants/httpCodes')

const validateCreateCard = Joi.object({
  cardName: Joi.string().alphanum().min(2).max(50).required(),
  cardDate: Joi.date().raw().optional(),
  series: Joi.string().optional(),
  cardNumber: Joi.number().min(1).max(21).optional(),
  edition: Joi.number().optional(),
  circulation: Joi.number().optional(),
  uploadCardThumbnailJpg: Joi.string().optional(),
  idCloudJpg: Joi.string().optional(),
  uploadCardHighResWebm: Joi.string().optional(),
  idCloudWebm: Joi.string().optional(),
  type: Joi.string().required(),
  rarity: Joi.string().required(),
  categories: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  goldenCard: Joi.boolean().optional(),
  openseaLink: Joi.string().optional(),
  artist: Joi.string().optional(),
  animator: Joi.string().optional(),
}).or('cardName', 'type', 'rarity')

const validateUpdateCard = Joi.object({
  cardName: Joi.string().alphanum().min(2).max(50).optional(),
  cardDate: Joi.date().raw().optional(),
  series: Joi.string().optional(),
  cardNumber: Joi.number().min(1).max(21).optional(),
  edition: Joi.number().optional(),
  circulation: Joi.number().optional(),
  uploadCardThumbnailJpg: Joi.string().optional(),
  idCloudJpg: Joi.string().optional(),
  uploadCardHighResWebm: Joi.string().optional(),
  idCloudWebm: Joi.string().optional(),
  type: Joi.string().optional(),
  rarity: Joi.string().optional(),
  categories: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  goldenCard: Joi.boolean().optional(),
  openseaLink: Joi.string().optional(),
  artist: Joi.string().optional(),
  animator: Joi.string().optional(),
}).or(
  'cardName',
  'cardDate',
  'series',
  'cardNumber',
  'edition',
  'circulation',
  'uploadCardThumbnailJpg',
  'idCloudJpg',
  'uploadCardHighResWebm',
  'idCloudWebm',
  'type',
  'rarity',
  'categories',
  'description',
  'goldenCard',
  'openseaLink',
  'artist',
  'animator',
)

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body)
    next()
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message.replace(/"/g, ''),
    })
  }
}

module.exports = {
  validationCreatedCard: (req, res, next) => {
    return validate(validateCreateCard, req.body, next)
  },
  validationUpdatedContact: (req, res, next) => {
    return validate(validateUpdateCard, req.body, next)
  },
}
