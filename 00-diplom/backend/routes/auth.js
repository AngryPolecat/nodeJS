const express = require('express')
const { register, login } = require('../controllers/user')
const mapUser = require('../helpers/mapUser')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password)
    res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) })
  } catch (e) {
    if (e.code === 11000) {
      res.send({ error: 'Такой пользователь уже существует' })
    } else {
      res.send({ error: e.message || 'Неизвестная ошибка' })
    }
  }
})

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)
    res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) })
  } catch (e) {
    res.send({ error: e.message || 'Неизвестная ошибка' })
  }
})

router.post('/logout', async (req, res) => {
  res.cookie('token', '').send({})
})

module.exports = router
