const fs = require('fs/promises')
const chalk = require('chalk')
const path = require('path')

const notesPath = path.join(__dirname, 'db.json')

const writeNotesToFile = async (notes) => await fs.writeFile(notesPath, JSON.stringify(notes))

const removeNote = async (id) => {
  const notes = await getNotes()
  const newNotes = notes.filter((note) => note.id != id)
  await writeNotesToFile(newNotes)
  console.log(chalk.green('OK. Note was removed'))
}

const editNote = async (id, title) => {
  const notes = await getNotes()
  const note = notes.find((note) => Number(note.id) === Number(id))
  if (note) {
    const updatedNotes = notes.map((note) => (Number(note.id) !== Number(id) ? note : { ...note, title }))
    await writeNotesToFile(updatedNotes)
    console.log(chalk.green('OK. Note was updated'))
  } else {
    console.log('Reject. Note id not found')
  }
}

const addNote = async (title) => {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  }
  notes.push(note)
  await writeNotesToFile(notes)
  console.log(chalk.green('OK. Note was added'))
}

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

const printNotes = async () => {
  const notes = await getNotes()
  console.log(chalk.blue('Here is the list of notes:'))
  notes.forEach(({ id, title }) => console.log(`id: ${chalk.red(id)} title: ${chalk.yellow(title)}`))
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  editNote,
}
