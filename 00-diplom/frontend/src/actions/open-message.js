import { ACTION_TYPE } from './action-type';

export const openMessage = (text) => ({
  type: ACTION_TYPE.OPEN_MESSAGE,
  payload: text,
});
