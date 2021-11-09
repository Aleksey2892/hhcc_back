const BaseController = require('./BaseController')
const Cards = require('../model/collectionMethods/Cards')
const HttpCodes = require('../constants/httpCodes')
const fs = require('fs').promises
const cloudUploadService = require('../services/cloudUpload')
require('dotenv').config()

class CardsController extends BaseController {
  constructor(options) {
    super(options)
  }

  uploadPng = async (req, res, next) => {
    const { id } = req.params
    const { resBuilder } = res

    try {
      const uploads = new cloudUploadService()
      const { idCloudJpg, imgUrl } = await uploads.saveImg(req.file.path)

      const card = await Cards.getById(id)

      if (card.idCloudJpg) {
        uploads.deleteOldAvatar(card.idCloudJpg)
      }

      await fs.unlink(req.file.path)
      await Cards.updatePng(id, imgUrl, idCloudJpg)
      return resBuilder.successCreated({
        code: HttpCodes.OK,
        message: 'The new Image card uploaded',
        data: imgUrl,
      })
    } catch (e) {
      next(e)
    }
  }

  uploadWebm = async (req, res, next) => {
    const { id } = req.params
    const { resBuilder } = res

    try {
      const uploads = new cloudUploadService()
      const { idCloudWebm, webmUrl } = await uploads.saveWebm(req.file.path)

      const card = await Cards.getById(id)
      if (card.idCloudJpg) {
        uploads.deleteOldAvatar(card.idCloudJpg)
      }

      await fs.unlink(req.file.path)
      await Cards.updateWebm(id, webmUrl, idCloudWebm)
      return resBuilder.successCreated({
        code: HttpCodes.OK,
        message: 'The new card Webm uploaded',
        data: webmUrl,
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new CardsController({
  methodsName: Cards,
  controllerName: 'Card',
})
