const mongoose = require('mongoose');

const NoteScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model('Note', NoteScheme);
module.exports = Note;
