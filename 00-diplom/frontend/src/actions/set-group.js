import { ACTION_TYPE } from './action-type';

export const setGroup = (group) => {
  return {
    type: ACTION_TYPE.SET_GROUP,
    payload: group,
  };
};
