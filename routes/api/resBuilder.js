class ResBuilder {
  #res
  constructor(res) {
    this.#res = res
  }

  success(code, resData) {
    return this.#res.status(code).json({
      status: 'success',
      code,
      resData,
    })
  }

  deleted(code, message, deletedCard) {
    return this.#res.status(code).json({
      status: 'success',
      code,
      message,
      deletedCard,
    })
  }

  error(code, message) {
    return this.#res.status(code).json({
      status: 'error',
      code,
      message,
    })
  }
}

module.exports = (req, res, next) => {
  res.resBuilder = new ResBuilder(res)
  next()
}
