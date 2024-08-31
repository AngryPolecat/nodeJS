import { getPost } from '../api';
import { getCommentsWithAuthor } from '../utils';

export const fetchPost = async (postId) => {
  let post;
  try {
    post = await getPost(postId);
  } catch (error) {
    return {
      error,
      res: null,
    };
  }

  const comments = await getCommentsWithAuthor(postId);

  return {
    error: null,
    res: {
      ...post,
      comments,
    },
  };
};
