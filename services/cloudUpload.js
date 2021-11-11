const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const uploadCloud = promisify(cloudinary.uploader.upload)

class cloudUploadService {
  async saveImg(pathFile, idCloudJpg) {
    const { public_id, secure_url } = await uploadCloud(pathFile, {
      public_id: idCloudJpg?.replace('cardsJpg/', ''),
      folder: 'cardsJpg',
    })
    return { idCloudJpg: public_id, imgUrl: secure_url }
  }

  async deleteOldAvatar(id) {
    await cloudinary.uploader.destroy(id, (err, result) => {
      console.log(result, err)
    })
  }

  async saveWebm(pathFile, idCLoudWebm) {
    const { public_id, secure_url } = await uploadCloud(pathFile, {
      resource_type: 'video',
      public_id: idCLoudWebm?.replace('cardsWebm/', ''),
      folder: 'cardsWebm',
    })
    return { idCloudWebm: public_id, webmUrl: secure_url }
  }
}

module.exports = cloudUploadService
