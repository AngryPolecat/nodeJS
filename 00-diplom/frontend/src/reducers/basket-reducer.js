import { ACTION_TYPE } from '../actions'

const initialBasketState = {
  products: [],
  totalCost: 0,
}

export const basketReducer = (state = initialBasketState, action) => {
  switch (action.type) {
    case ACTION_TYPE.RESET_BASKET:
      return initialBasketState
    case ACTION_TYPE.SET_BASKET:
      return {
        ...state,
        products: [...action.payload],
        totalCost: action.payload.reduce((acc, product) => acc + product.cost * product.item, 0),
      }
    case ACTION_TYPE.CHANGE_COUNT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          return product.id === action.payload.productId ? { ...product, item: action.payload.count } : product
        }),
        totalCost: state.products.reduce((acc, product) => (product.id === action.payload.productId ? acc + product.cost * action.payload.count : acc + product.cost * product.item), 0),
      }
    default:
      return state
  }
}
