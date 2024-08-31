const Post = require('../models/Post');
const Comment = require('../models/Comment');

// add
const addPost = async (postData) => {
  const post = await Post.create(postData);
  await post.populate({
    path: 'comments',
    populate: 'author',
  });
  return post;
};
// edit
const updatePost = async (id, postData) =>
  await Post.findByIdAndUpdate(id, postData, { returnDocument: 'after' }).populate({
    path: 'comments',
    populate: 'author',
  });

// delete
const deletePost = async (id) => await Post.deleteOne({ _id: id });

// get list posts
const getPosts = async (search = '', limit = 9, page = 1) => {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
};

// get post
const getPost = async (id) =>
  await Post.findById(id).populate({
    path: 'comments',
    populate: 'author',
  });

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
};
