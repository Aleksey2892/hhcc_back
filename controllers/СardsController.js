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

    try {
      const edition = await Editions.getById(editionId)
      body.edition = editionId
      body.series = edition.series

      if (req.file) {
        const uploads = new cloudUploadService()
        let { idCloudJpg, imgUrl } = await uploads.saveImg(req.file.path)
        body.uploadCardThumbnailJpg = imgUrl
        body.idCloudJpg = idCloudJpg
        await fs.unlink(req.file.path)
      }

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

  update = async (req, res, next) => {
    const {
      body = null,
      params: { id = null },
    } = req
    const { resBuilder } = res

    try {
      if (!req.file && !body.cardName && !body.type && !body.rarity) {
        return resBuilder.error({
          code: HttpCodes.BAD_REQUEST,
          message: 'At least one field is required',
        })
      }
      const uploads = new cloudUploadService()

      if (req.file) {
        let { idCloudJpg, imgUrl } = await uploads.saveImg(req.file.path)
        body.uploadCardThumbnailJpg = imgUrl
        body.idCloudJpg = idCloudJpg
        await fs.unlink(req.file.path)
      }

      const card = await this.methodsName.getById(id)

      if (card.idCloudJpg) {
        await uploads.deleteOldAvatar(card.idCloudJpg)
      }

      const updatedItem = await this.methodsName.updateItem(id, body)

      if (!updatedItem) {
        return resBuilder.error({
          code: HttpCodes.BAD_REQUEST,
          message: `[${this.controllerName}] with [${id}] id was not updated or not found!`,
        })
      }

      return resBuilder.successUpdated({
        code: HttpCodes.OK,
        message: `[${this.controllerName}] with [${id}] id was updated`,
        data: updatedItem,
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
      if (card.idCloudWebm) {
        await uploads.deleteOldAvatar(card.idCloudWebm)
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

  remove = async (req, res, next) => {
    const { id = null } = req.params
    const { resBuilder } = res

    try {
      const removedItem = await this.methodsName.removeItem(id)

      if (!removedItem) {
        return resBuilder.error({
          code: HttpCodes.SERVER_ERROR,
          message: `[${this.controllerName}] with [${id}] id was not deleted or not found!`,
        })
      }

      await Editions.updateItem(removedItem.edition, {
        $pull: { cards: removedItem._id },
      })
      await Series.updateItem(removedItem.series, {
        $pull: { cards: removedItem._id },
      })

      return resBuilder.successDeleted({
        code: HttpCodes.OK,
        message: `[${this.controllerName}] with [${id}] id was deleted`,
        data: removedItem,
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
