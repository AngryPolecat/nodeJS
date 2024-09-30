import { ACTION_TYPE } from './action-type';

export const openMessage = (text, error = true) => ({
  type: ACTION_TYPE.OPEN_MESSAGE,
  payload: { text, error },
});
