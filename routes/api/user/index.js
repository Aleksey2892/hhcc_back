const express = require('express')
const router = express.Router()
const faqController = require('../../../controllers/userController')
const guard = require('../../../helpers/guard')

router.post('/create', faqController.create)
router.post('/login', faqController.login)
router.post('/logout', guard, faqController.logout)

module.exports = router
