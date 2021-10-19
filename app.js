const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const BaseResBuilder = require('./routes/api/BaseResBuilder')
const HttpCodes = require('./constants/httpCodes')
const seriesRoute = require('./routes/api/series')
const cardsRoute = require('./routes/api/cards')
const faqRoute = require('./routes/api/faq')
const userRoute = require('./routes/api/user')
const guard = require('./helpers/guard')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/', userRoute)
app.use(BaseResBuilder)
app.use('/', guard, seriesRoute)
app.use('/', guard, cardsRoute)
app.use('/', guard, faqRoute)

app.use((_req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(err.status || HttpCodes.SERVER_ERROR).json({
    message: err.message || 'unknown error',
    status: err.status || HttpCodes.SERVER_ERROR,
  })
})

module.exports = app
