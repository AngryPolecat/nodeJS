import { getPost, addComment } from '../api';
import { ROLE, ERROR } from '../const';
import { getCommentsWithAuthor } from '../utils';
import { sessions } from '../sessions';

export const addPostComment = async (userSession, userId, postId, content) => {
  const accessRole = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  await addComment(userId, postId, content);

  const post = await getPost(postId);

  const comments = await getCommentsWithAuthor(postId);

  return {
    error: null,
    res: {
      ...post,
      comments,
    },
  };
};
