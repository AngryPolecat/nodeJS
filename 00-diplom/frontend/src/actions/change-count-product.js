import { ACTION_TYPE } from './action-type'

export const changeCountProduct = (productId, count) => {
  return {
    type: ACTION_TYPE.CHANGE_COUNT_PRODUCT,
    payload: { productId, count },
  }
}
