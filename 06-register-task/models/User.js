const mongoose = require('mongoose')

const UserScheme = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', UserScheme)
module.exports = User
