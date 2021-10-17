const HttpCodes = require('../constants/httpCodes')
const Faq = require('../model/collectionMethods/Faq')

module.exports = {
  async get(_req, res, next) {
    const { resBuilder } = res

    try {
      const questions = await Faq.getCollection()

      if (!questions.length) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: 'Faq list is empty or server error',
        })
      }

      return resBuilder.success({ code: HttpCodes.OK, data: questions })
    } catch (error) {
      next(error)
    }
  },
}
