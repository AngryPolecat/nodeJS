const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { register, login, getUsers, getRoles, deleteUser, updateUser } = require('./controllers/user')
const { getPosts } = require('./controllers/post')
const mapUser = require('./helpers/mapUser')
const auth = require('./middlewares/auth')
const hasRole = require('./middlewares/hasRole')
const ROLES = require('./const/roles')

const app = express()
const port = 3001

app.use(cookieParser())
app.use(express.json())

app.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password)
    res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) })
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password)
    res.cookie('token', token, { httpOnly: true }).send({ error: null, user: mapUser(user) })
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' })
  }
})

app.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({})
})

app.get('/posts', async (req, res) => {
  const data = await getPosts(req.query.search, req.query.limit, req.query.page)
  res.send({ data })
})

app.use(auth)

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers()
  res.send({ data: users.map((user) => mapUser(user)) })
})

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
  const user = await updateUser(req.params.id, {
    role: req.body.roleId,
  })
  res.send({ data: mapUser(user) })
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id)
  res.send({ error: null })
})

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles()
  res.send({ data: roles })
})

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`)
  })
})
