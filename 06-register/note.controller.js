const chalk = require('chalk')
const Note = require('./models/Note')

const removeNote = async (id) => {
  await Note.deleteOne({ _id: id })
  console.log(chalk.green('OK. Note was removed'))
}

const updateNote = async (id, title) => {
  await Note.updateOne({ _id: id }, { title })
  console.log(chalk.green('OK. Note was updated'))
}

const addNote = async (title, owner) => {
  await Note.create({ title, owner })
  console.log(chalk.green('OK. Note was added'))
}

const getNotes = async () => await Note.find()

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
}
