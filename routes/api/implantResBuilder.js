const HttpCodes = require('../../constants/httpCodes')

class CustomResBuilder {
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
    const { code = HttpCodes.OK, data, message = 'ok' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      data,
    })
  }

  successGetById(args) {
    const { code = HttpCodes.OK, data, message = 'found' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      data: {
        foundItem: data,
      },
    })
  }

  successCreated(args) {
    const { code = HttpCodes.OK, data, message = 'created' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      data: {
        created: data,
      },
    })
  }

  successUpdated(args) {
    const { code = HttpCodes.OK, data, message = 'updated' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      data: {
        updated: data,
      },
    })
  }

  successDeleted(args) {
    const { code = HttpCodes.OK, data, message = 'deleted' } = args

    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      data: {
        deleted: data,
      },
    })
  }
}

module.exports = (req, res, next) => {
  res.resBuilder = new CustomResBuilder(res)
  next()
}
