const faqModel = require('../../model/schemas/faq')
const BaseMethods = require('./BaseMethods')

class FaqMethods extends BaseMethods {}

module.exports = new FaqMethods(faqModel)
