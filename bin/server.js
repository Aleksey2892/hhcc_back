require('dotenv').config()
const app = require('../app')
const db = require('../model/db')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Database connection successful. API work on port: ${PORT}...`)
  })
}).catch(error => {
  console.error(`Server starting error: '${error.message}'`)
  process.exit(1)
})
