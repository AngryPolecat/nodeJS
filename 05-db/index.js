const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const { addNote, getNotes, removeNote, updateNote } = require('./note.controller.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.post('/', async (req, res) => {
  try {
    await addNote(req.body.title);
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    res.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.put('/:id', async (req, res) => {
  await updateNote(req.params.id, req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
    error: false,
  });
});

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`));
  });
});
