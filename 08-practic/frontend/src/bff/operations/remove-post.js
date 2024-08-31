import { ROLE, ERROR } from '../const';
import { sessions } from '../sessions';
import { deletePost, getComments, removeComment } from '../api';

export const removePost = async (userSession, postId) => {
  const accessRole = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  await deletePost(postId);
  const comments = await getComments(postId);
  /** Проблема удаления более 6 комментариев */
  await Promise.all(comments.map(async ({ id: commentId }) => await removeComment(commentId)));

  return {
    error: null,
    res: true,
  };
};
