const User = require('../schemas/user')

const create = async body => {
  return await User.create(body)
}

const findById = async id => {
  return await User.findById(id)
}

const findByLogin = async login => {
  return await User.findOne({ login })
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

module.exports = {
  findById,
  findByLogin,
  updateToken,
  create,
}
