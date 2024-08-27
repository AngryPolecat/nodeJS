const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { login, register, getUsers } = require('./controllers/user')
const mapUser = require('./helpers/mapUser')
const auth = require('./middlewares/auth')
const hasRole = require('./middlewares/hasRole')
const ROLES = require('./const/roles')

const app = express()
const port = 3002

app.use(express.json())
app.use(cookieParser())

app.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password)
    res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) })
  } catch (e) {
    res.send({ error: e.message || 'Неизвестная ошибка' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)
    res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) })
  } catch (e) {
    res.send({ error: e.message || 'Неизвестная ошибка' })
  }
})

app.post('/logout', async (req, res) => {
  res.cookie('token', '').send({})
})

app.use(auth)

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers()
  res.send({ data: users })
})

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}...`)
  })
})
