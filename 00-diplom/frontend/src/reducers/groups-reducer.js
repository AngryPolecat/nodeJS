import { ACTION_TYPE } from '../actions'

const initialGroupState = []

export const groupsReducer = (state = initialGroupState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_GROUPS:
      return [...action.payload]
    case ACTION_TYPE.ADD_GROUP:
      return state
    case ACTION_TYPE.DELETE_GROUP:
      return state
    default:
      return state
  }
}
