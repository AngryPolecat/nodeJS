import { ACTION_TYPE } from './action-type'

export const resetProduct = (groupId) => ({
  type: ACTION_TYPE.RESET_PRODUCT,
  payload: groupId,
})
