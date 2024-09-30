import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../utils';
import { Product } from './components/product/product';
import { userRoleSelector } from '../../selectors';
import { ROLE, SETTINGS } from '../../const';
import { openMessage, CLOSE_MESSAGE } from '../../actions';
import styled from 'styled-components';

const BasketContainer = ({ className }) => {
  const [basket, setBasket] = useState([]);
  const role = useSelector(userRoleSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    request('/basket', 'GET').then((basket) => {
      if (basket.error) {
        dispatch(openMessage(basket.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        navigate('/');
        return;
      }
      console.log(basket.data);

      setBasket(basket.data);
    });
  }, [dispatch, navigate]);

  if (role === ROLE.GUEST) {
    return <Navigate to="/403" />;
  }

  return (
    <div className={className}>
      <h3>Корзина</h3>
      <ul>
        {basket.map((product) => {
          return <Product id={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export const Basket = styled(BasketContainer)`
  width: 1000px;
  margin: 0 auto;
`;
