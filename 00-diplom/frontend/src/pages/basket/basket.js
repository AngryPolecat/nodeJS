//import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { request } from '../../utils';
import { Product } from './components/product/product';
import { userRoleSelector, basketSelector } from '../../selectors';
import { ROLE } from '../../const';
//import { openMessage, CLOSE_MESSAGE } from '../../actions';
import { Icon } from '../../components';
import styled from 'styled-components';

const BasketContainer = ({ className }) => {
  const role = useSelector(userRoleSelector);
  const basket = useSelector(basketSelector);
  //const dispatch = useDispatch();
  //const navigate = useNavigate();

  // useLayoutEffect(() => {
  //   setTotalPrice(products.reduce((acc, product) => acc + product.cost, 0))
  // }, [products])

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
`;
