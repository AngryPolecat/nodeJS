const chalk = require('chalk');
const { Problem } = require('./models/Problem');

const addProblem = async ({ fio, phone, problem }) => {
  await Problem.create({ fio, phone, problem });
  console.log(chalk.green('OK. Problem was added'));
};

const getProblems = async () => await Problem.find();

module.exports = {
  addProblem,
  getProblems,
};
