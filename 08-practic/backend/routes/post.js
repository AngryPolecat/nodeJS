const express = require('express');
const auth = require('../middlewares/auth');
const hasRole = require('../middlewares/hasRole');
const { addPost, getPosts, getPost, deletePost, updatePost } = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comment');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const ROLES = require('../const/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { posts, lastPage } = await getPosts(req.query.search, req.query.limit, req.query.page);
  res.send({ data: { lastPage, posts: posts.map((post) => mapPost(post)) } });
});

router.get('/:id', async (req, res) => {
  const post = await getPost(req.params.id);
  res.send({ data: mapPost(post) });
});

router.post('/:id/comments', auth, async (req, res) => {
  const comment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });
  res.send({ data: mapComment(comment) });
});

router.delete('/:postId/comments/:commentId', auth, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
  await deleteComment(req.params.postId, req.params.commentId);
  res.send({ error: null });
});

router.delete('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);
  res.send({ error: null });
});

router.post('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const post = await addPost({
    title: req.body.title,
    image: req.body.imageUrl,
    content: req.body.content,
  });
  res.send({ data: mapPost(post) });
});

router.patch('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const post = await updatePost(req.params.id, {
    title: req.body.title,
    image: req.body.imageUrl,
    content: req.body.content,
  });
  res.send({ data: mapPost(post) });
});

module.exports = router;
