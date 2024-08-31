const { verify } = require('../helpers/token')
const User = require('../models/User')

module.exports = async function (req, res, next) {
  try {
    const tokenData = verify(req.cookies.token)

    const user = await User.findOne({ _id: tokenData.id })

    if (!user) {
      res.send({ error: 'Authenticated user is fail' })
      return
    }

    req.user = user
    next()
  } catch (e) {
    res.send({ error: 'Authenticated user is fail' })
  }
}
