const BaseController = require('./BaseController')
const Cards = require('../model/collectionMethods/Cards')
const Series = require('../model/collectionMethods/Series')
const Editions = require('../model/collectionMethods/Editions')
const HttpCodes = require('../constants/httpCodes')
const fs = require('fs').promises
const cloudUploadService = require('../services/cloudUpload')
require('dotenv').config()

class CardsController extends BaseController {
  constructor(options) {
    super(options)
  }

  get = async (req, res, next) => {
    const {
      body = null,
      params: { editionId = null },
    } = req
    const { resBuilder } = res

    try {
      const collection = await this.methodsName.getCollection(editionId)

      if (!collection.length) {
        return resBuilder.error({
          code: HttpCodes.NOT_FOUND,
          message: `[${this.controllerName}] list is empty or server error!`,
        })
      }

      return resBuilder.success({
        code: HttpCodes.OK,
        data: collection,
      })
    } catch (e) {
      next(e)
    }
  }

  create = async (req, res, next) => {
    const {
      body = null,
      params: { editionId = null },
    } = req
    const { resBuilder } = res
    body.edition = editionId

    try {
      const edition = await Editions.getById(editionId)
      body.series = edition.series

      const newItem = await this.methodsName.createItem(body)

      if (edition && newItem) {
        await Editions.updateItem(editionId, { $push: { cards: newItem._id } })
        await Series.updateItem(edition.series, {
          $push: { cards: newItem._id },
        })
      }

      if (!newItem || !edition) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: `[${this.controllerName}] was not created!`,
        })
      }

      return resBuilder.successCreated({
        code: HttpCodes.OK,
        message: `New [${this.controllerName}] was created`,
        data: newItem,
      })
    } catch (e) {
      next(e)
    }
  }

  uploadPng = async (req, res, next) => {
    const { id } = req.params
    const { resBuilder } = res

    try {
      const uploads = new cloudUploadService()
      const { idCloudJpg, imgUrl } = await uploads.saveImg(req.file.path)

      const card = await Cards.getById(id)

      if (card.idCloudJpg) {
        await uploads.deleteOldAvatar(card.idCloudJpg)
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
        await uploads.deleteOldAvatar(card.idCloudJpg)
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
