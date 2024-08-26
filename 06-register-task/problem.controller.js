const chalk = require('chalk')
const { Problem } = require('./models/Problem')

const addProblem = async ({ fio, phone, problem }) => {
  const currentDate = new Date()
  await Problem.create({ fio, phone, problem, date: currentDate.toLocaleString() })
  console.log(chalk.green('OK. Problem was added'))
}

const getProblems = async (searchText = '') => {
  //const regex = new RegExp(searchText, 'i')
  //const problems = await Problem.find({ fio: { $regex: regex } })
  //return problems
  return await Problem.find()
}

module.exports = {
  addProblem,
  getProblems,
}
