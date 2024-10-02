import { ACTION_TYPE } from './action-type';

export const removeProduct = (productId) => {
  return {
    type: ACTION_TYPE.REMOVE_PRODUCT,
    payload: productId,
  };
};
