require('dotenv').config()
const app = require('../app')
const db = require('../model/db')
const createFolderIsNotExist = require('../helpers/createFolder')

const PORT = process.env.PORT || 3000
const UPLOUD_DIR = process.env.UPLOUD_DIR

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOUD_DIR)
    console.log(`Database connection successful. API work on port: ${PORT}...`)
  })
}).catch(error => {
  console.error(`Server starting error: '${error.message}'`)
  process.exit(1)
})
