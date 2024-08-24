const chalk = require('chalk');
const Note = require('./models/Note');

const removeNote = async (id, owner) => {
  const result = await Note.deleteOne({ _id: id, owner });

  if (result.deletedCount === 0) {
    throw new Error('You cannot delete this note');
  }
  console.log(chalk.green('OK. Note was removed'));
};

const updateNote = async (id, title, owner) => {
  const result = await Note.updateOne({ _id: id, owner }, { title });

  if (result.matchedCount === 0) {
    throw new Error('You cannot update this note');
  }
  console.log(chalk.green('OK. Note was updated'));
};

const addNote = async (title, owner) => {
  await Note.create({ title, owner });
  console.log(chalk.green('OK. Note was added'));
};

const getNotes = async () => await Note.find();

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
};
