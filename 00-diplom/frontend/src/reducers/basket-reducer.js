import { ACTION_TYPE } from '../actions';

const initialBasketState = {
  products: [],
  totalCost: 0,
};

export const basketReducer = (state = initialBasketState, action) => {
  switch (action.type) {
    case ACTION_TYPE.RESET_BASKET:
      return initialBasketState;
    case ACTION_TYPE.SET_BASKET:
      return {
        ...state,
        products: [...action.payload],
        totalCost: action.payload.reduce((acc, item) => acc + item.cost, 0),
      };
    default:
      return state;
  }
};
