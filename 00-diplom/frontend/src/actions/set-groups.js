import { ACTION_TYPE } from './action-type'

export const setGroups = (groups) => {
  return {
    type: ACTION_TYPE.SET_GROUPS,
    payload: groups,
  }
}
