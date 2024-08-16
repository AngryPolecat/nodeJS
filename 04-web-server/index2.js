const express = require('express')
const chalk = require('chalk')
const { addNote, getNotes } = require('./note.controller.js')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})
