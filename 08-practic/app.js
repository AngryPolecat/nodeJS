const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { register, login, getUsers, getRoles, deleteUser, updateUser } = require('./controllers/user')
const { getPosts, getPost, addPost, updatePost, deletePost } = require('./controllers/post')
const { getComments, addComment } = require('./controllers/comment')
const mapUser = require('./helpers/mapUser')
const mapPost = require('./helpers/mapPost')
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
  const { posts, lastPage } = await getPosts(req.query.search, req.query.limit, req.query.page)
  res.send({ data: { lastPage, posts: posts.map((post) => mapPost(post)) } })
})

app.get('/posts/:id', async (req, res) => {
  const post = await getPost(req.params.id)
  res.send({ data: mapPost(post) })
})

// убрать под аутентификацию

app.post('/post/:id/comments', async (req, res) => {
  const comment = await addComment(req.params.id, {
    content: req.body.content,
    author: '66cd9153d4c632f00a2cb66a',
  })
  res.send({ data: comment })
})

app.get('/post/:id/comments', async (req, res) => {
  const comments = await getComments()
  res.send({ data: comments })
})

app.delete('/posts/:id', async (req, res) => {
  await deletePost(req.params.id)
  res.send({ error: null })
})

app.post('/posts', async (req, res) => {
  const post = await addPost({
    title: req.body.title,
    image: req.body.imageUrl,
    content: req.body.content,
  })
  res.send({ data: mapPost(post) })
})

app.patch('/posts/:id', async (req, res) => {
  const post = await updatePost(req.params.id, {
    title: req.body.title,
    image: req.body.imageUrl,
    content: req.body.content,
  })
  res.send({ data: mapPost(post) })
})

app.get('/users', async (req, res) => {
  const users = await getUsers()
  res.send({ data: users.map((user) => mapUser(user)) })
})

app.use(auth)

// app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
//   const users = await getUsers()
//   res.send({ data: users.map((user) => mapUser(user)) })
// })

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
