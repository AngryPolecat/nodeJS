const yargs = require('yargs')
const { printNotes, addNote, removeNote, editNote } = require('./note.controller')

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  handler({ title }) {
    addNote(title)
  },
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: 'true',
    },
  },
})

yargs.command({
  command: 'list',
  describe: 'Show all notes',
  async handler() {
    printNotes()
  },
})

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  async handler({ id }) {
    removeNote(id)
  },
  builder: {
    id: {
      type: Number,
      describe: 'Note id',
      demandOption: 'true',
    },
  },
})

yargs.command({
  command: 'edit',
  describe: 'Edit note by id',
  async handler({ id, title }) {
    editNote(id, title)
  },
  builder: {
    id: {
      type: Number,
      describe: 'Note id',
      demandOption: 'true',
    },
    title: {
      type: String,
      describe: 'Note title',
      demandOption: 'true',
    },
  },
})

yargs.parse()
