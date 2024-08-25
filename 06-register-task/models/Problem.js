const mongoose = require('mongoose');

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
});

const Problem = mongoose.model('Problem', ProblemScheme);
module.exports = { Problem };
