const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { addProblem, getProblems } = require('./problem.controller.js');
const { loginUser } = require('./users.controller.js');
const { auth } = require('./middlewares/auth.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/problems');
  } catch (e) {
    res.render('login', {
      title: 'Recording App',
      error: e.message,
    });
  }
});

app.get('/login', async (req, res) => {
  res.render('login', {
    title: 'Recording App',
    error: false,
  });
});

app.post('/', async (req, res) => {
  try {
    await addProblem(req.body);
    res.render('index', {
      title: 'Recording App',
      create: true,
      error: false,
    });
  } catch (e) {
    res.render('index', {
      title: 'Recording App',
      create: false,
      error: `Ошибка при записи к врачу. ${e.message}`,
    });
  }
});

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Recording App',
    create: false,
    error: false,
  });
});

app.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true });
  res.redirect('/login');
});

app.use(auth);

app.get('/problems', async (req, res) => {
  res.render('problems', {
    title: 'Recording App',
    problems: await getProblems(),
    error: false,
  });
});

mongoose.connect('mongodb+srv://mvv:4vJGI5bfG3o8JDV5@cluster0.rd9er.mongodb.net/problems?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  app.listen(port, () => {
    //Problem.create({ fio: 'FIO', phone: '77777', problem: 'qwerty' });
    console.log(chalk.green(`Server has been started on port ${port}...`));
  });
});
