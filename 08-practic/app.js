const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { register, login } = require('./controllers/user')
const mapUser = require('./helpers/mapUser')

const app = express()
const port = 3001

app.use(cookieParser())
app.use(express.json())

app.post('/register', async (req, res) => {
  try {
    const user = await register(req.body.login, req.body.password)
    res.send({ error: null, user: mapUser(user) })
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

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`)
  })
})
