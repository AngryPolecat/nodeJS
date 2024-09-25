import { ACTION_TYPE } from './action-type';

export const removeComment = (commentId) => {
  return {
    type: ACTION_TYPE.REMOVE_COMMENT,
    payload: commentId,
  };
};
