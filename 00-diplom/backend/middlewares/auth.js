const { verifyToken } = require('../helpers/token')
const User = require('../models/User')
const mapUser = require('../helpers/mapUser')

module.exports = async function (req, res, next) {
  try {
    const tokenData = verifyToken(req.cookies.token)
    const user = await User.findOne({ _id: tokenData.id })
    if (!user) {
      res.send({ error: 'Доступ запрещен' })
      return
    }

    req.user = mapUser(user)
    next()
  } catch (e) {
    res.send({ error: 'Доступ запрещен' })
  }
}
