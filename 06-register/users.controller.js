const chalk = require('chalk')
const User = require('./models/User')
const bcrypt = require('bcrypt')

const addUser = async (email, password) => {
  const hashPassword = await bcrypt.hash(password, 10)
  await User.create({ email, password: hashPassword })
}

module.exports = {
  addUser,
}
