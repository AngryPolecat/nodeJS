const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const app = express()
const port = 3002

app.use(express.json())
app.use(cookieParser())
app.use('/api', routes)

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}...`)
  })
})
