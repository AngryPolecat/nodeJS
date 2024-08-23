const express = require('express')
const chalk = require('chalk')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { addNote, getNotes, removeNote, updateNote } = require('./note.controller.js')
const { addUser, loginUser } = require('./users.controller.js')
const { auth } = require('./middlewares/auth.js')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.post('/register', async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password)
    res.redirect('/login')
  } catch (e) {
    if (e.code === 11000) {
      res.render('register', {
        title: 'Express App',
        error: 'Email is already registered',
      })
      return
    }
    res.render('register', {
      title: 'Express App',
      error: e.message,
    })
  }
})

app.get('/register', async (req, res) => {
  res.render('register', {
    title: 'Express App',
    error: false,
  })
})

app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password)
    res.cookie('token', token)
    res.redirect('/')
  } catch (e) {
    res.render('login', {
      title: 'Express App',
      error: e.message,
    })
  }
})

app.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Express App',
    error: false,
  })
})

app.use(auth)

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  })
})

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title, req.user.email)
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: true,
      error: false,
    })
  } catch (e) {
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: false,
      error: true,
    })
  }
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  })
})

app.put('/:id', async (req, res) => {
  await updateNote(req.params.id, req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  })
})

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
  })
})
