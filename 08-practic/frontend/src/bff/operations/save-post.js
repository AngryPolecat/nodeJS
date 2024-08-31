import { ROLE, ERROR } from '../const';
import { sessions } from '../sessions';
import { updatePost, createPost } from '../api';

export const savePost = async (userSession, dataPost) => {
  const accessRole = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  const savedPost = dataPost.id ? await updatePost(dataPost) : await createPost(dataPost);
  return {
    error: null,
    res: savedPost,
  };
};
