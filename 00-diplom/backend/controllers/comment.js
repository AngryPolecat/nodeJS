const Comment = require('../models/Comment')

// добавить комментарий
const addComment = async (comment) => await Comment.create(comment)

// удалить комментарий
const deleteComment = async (id) => await Comment.deleteOne({ _id: id })

// список комментариев
const getComments = async (product) => await Comment.find({ product })

module.exports = {
  addComment,
  deleteComment,
  getComments,
}
