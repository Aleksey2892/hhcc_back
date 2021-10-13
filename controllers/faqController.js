const HttpCodes = require('../constants/httpCodes')
const Faq = require('../model/methods/Faq')

const faqController = {
  async get(_req, res, next) {
    try {
      const questions = await Faq.getAll()
      return !questions
        ? res.status(HttpCodes.SERVER_ERROR)
        : res
            .status(HttpCodes.OK)
            .json({ status: HttpCodes.OK, responseData: { questions } })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = faqController
