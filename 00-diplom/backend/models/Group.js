const mongoose = require('mongoose')

const GroupScheme = mongoose.Schema(
  {
    group: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const Group = mongoose.model('Group', GroupScheme)

module.exports = Group
