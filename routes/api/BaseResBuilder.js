const HttpCodes = require('../../constants/httpCodes')

class BaseResBuilder {
  #res
  constructor(res) {
    this.#res = res
  }

  error(args) {
    const { code = HttpCodes.SERVER_ERROR, message = 'something went wrong' } =
      args

    return this.#res.status(code).json({
      status: 'error',
      code,
      message,
    })
  }

  success(args) {
    const { code = HttpCodes.OK, data = {}, message = 'ok' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      data,
    })
  }

  created(args) {
    const { code = HttpCodes.OK, data, message = 'created' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      created: data,
    })
  }

  updated(args) {
    const { code = HttpCodes.OK, data, message = 'updated' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      updated: data,
    })
  }

  deleted(args) {
    const { code = HttpCodes.OK, data, message = 'deleted' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      deleted: data,
    })
  }
}

module.exports = (req, res, next) => {
  res.resBuilder = new BaseResBuilder(res)
  next()
}
