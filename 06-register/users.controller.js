const chalk = require('chalk')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./const')

const addUser = async (email, password) => {
  const hashPassword = await bcrypt.hash(password, 10)
  await User.create({ email, password: hashPassword })
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User is not found')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('Password is not correct')
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
  addUser,
  loginUser,
}
