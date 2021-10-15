const SeriesModel = require('../schemas/series')

const SeriesMethods = {
  getCollection() {
    return SeriesModel.find({})
  },

  //TODO add other methods
}

module.exports = SeriesMethods
