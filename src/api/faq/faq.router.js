const express = require('express')
const router = express.Router()
const faqController = require('./Faq.controller')

router.get('/faq', faqController.get)

module.exports = router
