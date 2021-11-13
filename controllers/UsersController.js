const HttpCodes = require('../constants/httpCodes')
const Users = require('../model/collectionMethods/Users')
const BaseController = require('./BaseController')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

class UsersController extends BaseController {
  constructor(options) {
    super(options)
  }

  async create(req, res, next) {
    const { resBuilder } = res

    try {
      const user = await Users.findByLogin(req.body.login)

      if (user) {
        return res.status(HttpCodes.CONFLICT).json({
          status: 'error',
          code: HttpCodes.CONFLICT,
          message: 'Login is already used',
        })
        // return resBuilder.error({
        //   code: HttpCodes.CONFLICT,
        //   message: 'Login is already used',
        // })
      }

      const { id, login } = await Users.createItem(req.body)
      return res.status(HttpCodes.CREATED).json({
        status: 'success',
        code: HttpCodes.CREATED,
        data: { id, login },
      })
      // return resBuilder.successCreated({
      //   code: HttpCodes.CREATED,
      //   data: { id, login },
      // })
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    const { resBuilder } = res

    try {
      const user = await Users.findByLogin(req.body.login)
      const isValidPassword = await user.isValidPassword(req.body.password)

      if (!user || !isValidPassword) {
        return res.status(HttpCodes.UNAUTHORIZED).json({
          status: 'error',
          code: HttpCodes.UNAUTHORIZED,
          message: 'Invalid credentials',
        })
        // return resBuilder.error({
        //   code: HttpCodes.UNAUTHORIZED,
        //   message: 'Invalid credentials',
        // })
      }
      // console.log(user)

      const id = user.id
      const payload = { id }
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' })
      await Users.updateToken(id, token)

      return res.status(HttpCodes.CREATED).json({
        status: 'success',
        code: HttpCodes.CREATED,
        data: { token },
      })
      // return resBuilder.success({
      //   code: HttpCodes.CREATED,
      //   data: { token },
      // })
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    const { resBuilder } = res

    try {
      const id = req.user.id
      await Users.updateToken(id, null)

      // return res.status(HttpCodes.NO_CONTENT).json({})
      return resBuilder.success({ code: HttpCodes.NO_CONTENT })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new UsersController({
  methodsName: Users,
  controllerName: 'Users',
})
