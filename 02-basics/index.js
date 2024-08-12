const yargs = require('yargs');
const { printNotes, addNote, removeNote } = require('./note.controller');

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  handler({ title }) {
    addNote(title);
  },
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: 'true',
    },
  },
});

yargs.command({
  command: 'list',
  describe: 'Show all notes',
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  async handler({ id }) {
    removeNote(id);
  },
  builder: {
    id: {
      type: Number,
      describe: 'Note id',
      demandOption: 'true',
    },
  },
});

yargs.parse();
