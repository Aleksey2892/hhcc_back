const express = require('express')
const router = express.Router()
const faqController = require('../../../controllers/faqController')
const guard = require('../../../helpers/guard')

router.get('/faq', guard, faqController.get)

module.exports = router
