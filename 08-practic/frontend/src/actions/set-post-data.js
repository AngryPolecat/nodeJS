import { ACTION_TYPE } from './action-type';

export const setPostData = (post) => ({
  type: ACTION_TYPE.SET_POST_DATA,
  payload: post,
});
