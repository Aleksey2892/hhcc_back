const HttpCodes = require('../constants/httpCodes')
const User = require('../model/collectionMethods/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const userController = {
  async create(req, res, next) {
    try {
      const user = await User.findByLogin(req.body.login)

      if (user) {
        return res.status(HttpCodes.CONFLICT).json({
          status: 'error',
          code: HttpCodes.CONFLICT,
          message: 'Login is already used',
        })
      }

      const { id, login } = await User.create(req.body)
      return res.status(HttpCodes.CREATED).json({
        status: 'success',
        code: HttpCodes.CREATED,
        data: { id, login },
      })
    } catch (e) {
      next(e)
    }
  },

  async login(req, res, next) {
    try {
      const user = await User.findByLogin(req.body.login)
      const isValidPassword = await user?.isValidPassword(req.body.password)

      if (!user || !isValidPassword) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: 'error',
          code: HttpCodes.UNAUTHORIZED,
          message: 'Invalid credentials',
        })
      }

      const id = user.id
      const payload = { id }
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
      await User.updateToken(id, token)

      return res.status(HttpCodes.CREATED).json({
        status: 'success',
        code: HttpCodes.CREATED,
        data: { token },
      })
    } catch (e) {
      next(e)
    }
  },

  async logout(req, res, next) {
    try {
      const id = req.user.id
      await User.updateToken(id, null)

      return res.status(HttpCodes.NO_CONTENT).json({})
    } catch (e) {
      next(e)
    }
  },
}

module.exports = userController
