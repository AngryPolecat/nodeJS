const bcrypt = require('bcrypt')
const User = require('../models/User')
const { createToken } = require('../helpers/token')

const register = async (login, password) => {
  if (!password) {
    throw new Error('Пароль не может быть пустым')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ login, password: passwordHash })

  const token = createToken({ id: user.id })

  return {
    user,
    token,
  }
}

const login = async (login, password) => {
  const user = await User.findOne({ login })
  if (!user) {
    throw new Error('Пользователь не найден')
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('Пароль не верный')
  }

  const token = createToken({ id: user.id })

  return {
    user,
    token,
  }
}

const getUsers = async () => await User.find()

module.exports = {
  login,
  register,
  getUsers,
}
