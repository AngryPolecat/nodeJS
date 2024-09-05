const jwt = require('jsonwebtoken')

const sign = 'secret-phrase'

const createToken = (data) => jwt.sign(data, sign, { expiresIn: '30d' })

const verifyToken = (token) => jwt.verify(token, sign)

module.exports = {
  createToken,
  verifyToken,
}
