import { ACTION_TYPE } from './action-type'

export const addGroups = (group) => {
  return {
    type: ACTION_TYPE.ADD_GROUP,
    payload: group,
  }
}
