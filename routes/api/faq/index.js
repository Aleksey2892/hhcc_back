const express = require('express')
const router = express.Router()
const FaqController = require('../../../controllers/FaqController')

router.get('/faq', FaqController.get)

module.exports = router
