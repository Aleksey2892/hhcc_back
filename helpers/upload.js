const multer = require('multer')
const HttpCodes = require('../constants/httpCodes')

require('dotenv').config()
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('webm') || file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    const error = new Error('The file type is incorrect')
    error.status = HttpCodes.BAD_REQUEST
    cb(error)
  },
})

module.exports = upload