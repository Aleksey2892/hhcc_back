const express = require('express')
const router = express.Router()
const UserController = require('../../../controllers/UserController')
const guard = require('../../../helpers/guard')

router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.post('/logout', guard, UserController.logout)

module.exports = router
