const Comment = require('../models/Comment');
const Post = require('../models/Post');

// add comments
const addComment = async (postId, commentData) => {
  const comment = await Comment.create(commentData);
  await Post.findByIdAndUpdate(postId, { $push: { comments: comment } });
  await comment.populate('author');
  return comment;
};

const deleteComment = async (postId, commentId) => {
  await Comment.deleteOne({ _id: commentId });
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
};

module.exports = {
  addComment,
  deleteComment,
};
