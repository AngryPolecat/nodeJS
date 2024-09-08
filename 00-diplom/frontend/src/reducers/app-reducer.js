import { ACTION_TYPE } from '../actions';

const initialAppState = {
  login: false,
  register: false,
  message: {
    status: false,
    text: '',
  },
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        login: !state.login,
        register: false,
      };
    case ACTION_TYPE.REGISTER:
      return {
        ...state,
        login: false,
        register: true,
      };
    case ACTION_TYPE.WASLOGIN:
      return {
        ...state,
        login: false,
        register: false,
      };
    case ACTION_TYPE.OPEN_MESSAGE:
      return {
        ...state,
        message: {
          status: true,
          text: action.payload,
        },
      };
    case ACTION_TYPE.CLOSE_MESSAGE:
      return {
        ...state,
        message: {
          status: false,
          text: '',
        },
      };
    default:
      return state;
  }
};
