import { ACTION_TYPE } from './action-type'

export const setBasket = (basket) => ({
  type: ACTION_TYPE.SET_BASKET,
  payload: basket,
})
