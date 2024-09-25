const Comment = require('../models/Comment');
const Product = require('../models/Product');

// добавить комментарий
const addComment = async (productId, commentData) => {
  const comment = await Comment.create(commentData);
  await Product.findByIdAndUpdate(productId, { $push: { comments: comment } });
  await comment.populate('author');
  return comment;
};

// удалить комментарий
const deleteComment = async (productId, commentId) => {
  await Comment.deleteOne({ _id: commentId });
  await Product.findByIdAndUpdate(productId, { $pull: { comments: commentId } });
};

module.exports = {
  addComment,
  deleteComment,
};
