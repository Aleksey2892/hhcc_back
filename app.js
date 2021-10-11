const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const HttpCodes = require('./constants/httpCodes')
const cardsRoute = require('./routes/api/cardsRoute')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/', cardsRoute)

app.use((_req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({ message: 'Not found' })
})

app.use((err, _req, res, _next) => {
  res.status(err.status || HttpCodes.SERVER_ERROR).json({
    message: err.message || 'unknown error',
  })
})

module.exports = app
