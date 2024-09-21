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
const deleteComment = async (id) => await Comment.deleteOne({ _id: id });

// список комментариев
const getComments = async (product) => await Comment.find({ product });

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
