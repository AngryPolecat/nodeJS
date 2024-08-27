const jwt = require('jsonwebtoken')

const sign = 'secret-phrase'

const createToken = (data) => jwt.sign(data, sign, { expiresIn: '30d' })

module.exports = {
  createToken,
}
