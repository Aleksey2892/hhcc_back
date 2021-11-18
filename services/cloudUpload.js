const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const uploadCloud = promisify(cloudinary.uploader.upload)

class CloudUploadService {
  async saveSeriesLogo(pathFile, idCloudJpg) {
    const { publicId, secureUrl } = await uploadCloud(pathFile, {
      publicId: idCloudJpg?.replace('cardsJpg/', ''),
      folder: 'seriesLogo',
    })
    return { idCloudLogo: publicId, urlLogo: secureUrl }
  }

  async saveImg(pathFile, idCloudJpg) {
    const { publicId, secureUrl } = await uploadCloud(pathFile, {
      publicId: idCloudJpg?.replace('cardsJpg/', ''),
      folder: 'cardsJpg',
    })
    return { idCloudJpg: publicId, imgUrl: secureUrl }
  }

  async deleteOldAvatar(id) {
    await cloudinary.uploader.destroy(id, (err, result) => {
      console.log(result, err)
    })
  }

  async saveWebm(pathFile, idCLoudWebm) {
    const { publicId, secureUrl } = await uploadCloud(pathFile, {
      resource_type: 'video',
      publicId: idCLoudWebm?.replace('cardsWebm/', ''),
      folder: 'cardsWebm',
    })
    return { idCloudWebm: publicId, webmUrl: secureUrl }
  }
}

module.exports = CloudUploadService
