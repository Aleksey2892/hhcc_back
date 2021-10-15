class SeriesResBuilder {
  #res
  constructor(res) {
    this.#res = res
  }

  success(code, resData, message) {
    return this.#res.status(code).json({
      status: 'success',
      code,
      resData,
      message,
    })
  }

  deleted(code, deletedCard, message) {
    return this.#res.status(code).json({
      status: 'success',
      code,
      deletedCard,
      message,
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
  res.resBuilder = new SeriesResBuilder(res)
  next()
}
