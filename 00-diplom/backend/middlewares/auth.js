const { verifyToken } = require('../helpers/token')
const User = require('../models/User')

module.exports = async function (req, res, next) {
  try {
    const tokenData = verifyToken(req.cookies.token)

    const user = await User.findOne({ _id: tokenData.id })

    if (!user) {
      res.send({ error: 'Доступ запрещен' })
      return
    }

    req.user = user
    next()
  } catch (e) {
    res.send({ error: 'Доступ запрещен' })
  }
}
