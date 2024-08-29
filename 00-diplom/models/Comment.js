const mongoose = require('mongoose')

const CommentScheme = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Product', CommentScheme)

module.exports = Comment
