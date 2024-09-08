const mongoose = require('mongoose');
const validator = require('validator');

const GroupScheme = mongoose.Schema(
  {
    group: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'Image should be a valid url',
      },
    },
  },
  { timestamps: true }
);

const Group = mongoose.model('Group', GroupScheme);

module.exports = Group;
