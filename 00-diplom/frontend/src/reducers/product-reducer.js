import { ACTION_TYPE } from '../actions';

const initialProductState = {
  id: null,
  title: '',
  group: null,
  url: '',
  cost: '',
  count: '',
  description: '',
  comments: [],
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.RESET_PRODUCT:
      return {
        ...initialProductState,
        group: action.payload,
      };
    case ACTION_TYPE.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case ACTION_TYPE.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.payload),
      };
    default:
      return state;
  }
};
