import { ACTION_TYPE } from '../actions'

const initialPostState = {
  id: null,
  title: '',
  imageUrl: '',
  content: '',
  publishedAt: null,
  comments: [],
}

export const postReducer = (state = initialPostState, action) => {
  switch (action.type) {
    case ACTION_TYPE.RESET_POST_DATA:
      return initialPostState
    case ACTION_TYPE.SET_POST_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
