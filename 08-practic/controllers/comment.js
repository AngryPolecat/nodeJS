const Comment = require('../models/Comment')
const Post = require('../models/Post')

// add comments
const addComment = async (postId, commentData) => {
  const comment = await Comment.create(commentData)
  await Post.findByIdAndUpdate(postId, { $push: { comments: comment } })
  return comment
}

// get list comments
const getComments = async () => await Comment.find()

module.exports = {
  getComments,
  addComment,
}
