import { ACTION_TYPE } from '../actions'

const initialProductState = {
  id: null,
  title: '',
  group: null,
  url: '',
  cost: null,
  count: null,
  description: '',
  comments: [],
}

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT:
      return {
        ...state,
        ...action.payload,
      }
    case ACTION_TYPE.RESET_PRODUCT:
      return {
        ...initialProductState,
        group: action.payload,
      }
    default:
      return state
  }
}
