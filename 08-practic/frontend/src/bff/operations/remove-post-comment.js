import { getPost, removeComment } from '../api';
import { ROLE, ERROR } from '../const';
import { getCommentsWithAuthor } from '../utils';
import { sessions } from '../sessions';

export const removePostComment = async (userSession, commentId, postId) => {
  const accessRole = [ROLE.ADMIN, ROLE.MODERATOR];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  await removeComment(commentId);

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
