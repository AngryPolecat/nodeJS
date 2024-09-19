import { ACTION_TYPE } from '../actions';

const initialGroupState = {
  id: null,
  title: '',
};

export const groupReducer = (state = initialGroupState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
