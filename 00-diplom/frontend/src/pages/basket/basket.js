import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { request } from '../../utils';
import { Product } from './components/product/product';
import { userRoleSelector, basketSelector } from '../../selectors';
import { ROLE, SETTINGS } from '../../const';
import { RESET_BASKET, openMessage, CLOSE_MESSAGE, TOGGLE_LOADER } from '../../actions';
import { Icon, Button } from '../../components';
import styled from 'styled-components';

const BasketContainer = ({ className }) => {
  const role = useSelector(userRoleSelector);
  const basket = useSelector(basketSelector);
  const dispatch = useDispatch();

  const handlerClearBasket = () => {
    request('/basket', 'DELETE').then((result) => {
      if (result.error) {
        dispatch(openMessage(result.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        return;
      }
      dispatch(RESET_BASKET);
    });
  };

  const handlerBuyBasket = () => {
    dispatch(TOGGLE_LOADER);
    const listProductsToBuy = basket.products.map((product) => {
      return {
        id: product.id,
        count: Number(product.item),
      };
    });
    request('/groups', 'PATCH', listProductsToBuy).then((result) => {
      const message = result.error ? result.error : 'Заказ оформлен';
      const error = result.error ? true : false;
      dispatch(openMessage(message, error));
      setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
      dispatch(RESET_BASKET);
      dispatch(TOGGLE_LOADER);
    });
  };

  if (role === ROLE.GUEST) {
    return <Navigate to="/403" />;
  }

  return (
    <div className={className}>
      <h3>Корзина</h3>
      <ul>
        {basket.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
      <hr />
      <div className="total-price">
        Общая стоимость: {basket.totalCost}
        <Icon id="fa-btc" size="16px" margin="0 0 0 0" />
      </div>
      <hr />
      <div className="buttons">
        <Button width="150px" onClick={handlerClearBasket}>
          Очистить корзину
        </Button>
        <Button width="150px" margin="0 10px" onClick={handlerBuyBasket}>
          Купить
        </Button>
      </div>
    </div>
  );
};

export const Basket = styled(BasketContainer)`
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 60px;

  & ul {
    padding-left: 0;
  }

  & .total-price {
    display: flex;
    flex-direction: row;
    justify-content: end;
    font-weight: bold;
    margin-right: 10px;
  }

  & .buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;
