const Comment = require('../models/Comment')

// add comments
const addComment = async (postId, commentData) => await Comment.create(commentData)

// get list comments
const getComments = async () => await Comment.find()

module.exports = {
  getComments,
  addComment,
}
