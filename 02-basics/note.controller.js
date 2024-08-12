const fs = require('fs/promises');
const chalk = require('chalk');
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');

const addNote = async (title) => {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green('OK. Note was added'));
};

const getNotes = async () => {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
};

const printNotes = async () => {
  const notes = await getNotes();
  console.log(chalk.blue('This is List notes'));
  notes.forEach(({ id, title }) => console.log(`id: ${chalk.red(id)} title: ${chalk.yellow(title)}`));
};

module.exports = {
  addNote,
  printNotes,
};
