const mongoose = require('mongoose')
const validator = require('validator')

const ProductScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator: validator.isURL,
      },
    },
    cost: {
      type: Number,
      validate: {
        validator: validator.isNumeric,
      },
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', ProductScheme)

module.exports = Product
