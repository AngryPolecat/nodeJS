import { ACTION_TYPE } from '../actions';

const initialAppState = {
  login: false,
  register: false,
  message: {
    status: false,
    text: '',
    error: false,
  },
  modal: {
    isOpen: false,
    text: '',
    onConfirm: () => {},
    onCancel: () => {},
  },
  isLoading: false,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_LOADER:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case ACTION_TYPE.CLOSE_MODAL:
      return {
        ...state,
        modal: initialAppState.modal,
      };
    case ACTION_TYPE.OPEN_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload,
          isOpen: true,
        },
      };
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
          text: action.payload.text,
          error: action.payload.error,
        },
      };
    case ACTION_TYPE.CLOSE_MESSAGE:
      return {
        ...state,
        message: initialAppState.message,
      };
    default:
      return state;
  }
};
