const mongoose = require('mongoose')

const ProblemScheme = mongoose.Schema({
  fio: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
})

const Problem = mongoose.model('Problem', ProblemScheme)
module.exports = { Problem }
