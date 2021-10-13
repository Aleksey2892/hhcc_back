const express = require('express')
const router = express.Router()
const faqController = require('../../../controllers/faqController')

router.get('/faq', faqController.get)

module.exports = router
