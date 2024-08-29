const Post = require('../models/Post')

// add
const addPost = async (postData) => await Post.create(postData)

// edit
const updatePost = async (id, postData) => await Post.findByIdAndUpdate(id, postData, { returnDocument: 'after' })

// delete
const deletePost = async (id) => await Post.deleteOne({ _id: id })

// get list posts
const getPosts = async (search = '', limit = 9, page = 1) => {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ])

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  }
}

// get post
const getPost = async (id) => await Post.findById(id)

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
}
