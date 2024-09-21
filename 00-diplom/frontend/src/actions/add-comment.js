import { ACTION_TYPE } from './action-type';

export const addComment = (comment) => {
  return {
    type: ACTION_TYPE.ADD_COMMENT,
    payload: comment,
  };
};
