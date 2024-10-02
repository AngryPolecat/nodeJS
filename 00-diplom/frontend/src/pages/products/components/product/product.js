import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { userRoleSelector } from '../../../../selectors';
import { ROLE, SETTINGS } from '../../../../const';
import { request } from '../../../../utils';
import { openMessage, CLOSE_MESSAGE, addProduct } from '../../../../actions';
import styled from 'styled-components';

const ProductContainer = ({ className, product: { id, title, url, cost, count, comments }, groupId, ...props }) => {
  const role = useSelector(userRoleSelector);
  const dispatch = useDispatch();

  const handlerAddToBasket = (event, productId) => {
    request('/basket', 'POST', { product: productId }).then((product) => {
      const message = product.error ? product.error : 'Товар добавлен в корзину';
      const error = product.error ? true : false;
      dispatch(openMessage(message, error));
      setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
      if (!product.error && product.data) {
        //dispatch(setBasket(product.data));
        dispatch(addProduct(product.data));
      }
    });
    event.stopPropagation();
  };

  const isGuest = role === ROLE.GUEST ? true : false;

  return (
    <div className={className} {...props}>
      <div className="product-title">
        <div className={!url ? 'no-url-image' : null}>{url ? <img src={url} alt="" /> : null}</div>
        <div className="product-model">{title}</div>
      </div>
      <div className="product-info">
        <div className="product-info-2">
          <div className="product-cost">
            <div>
              <Icon id="fa-btc" size="20px" margin="0 12px 5px 3px" title="Цена" />
              <span>{cost}</span>
            </div>
            <div>
              <Icon id="fa-university" size="18px" margin="0 9px 5px 0" title="Остаток на складе" />
              <span>{count}</span>
            </div>
            <div>
              <Icon id="fa-comment-o" size="18px" margin="0 12px 5px 1px" title="Комментарии" />
              <span>{comments.length}</span>
            </div>
          </div>
          {!isGuest && count > 0 ? (
            <div>
              <Icon id="fa-shopping-cart" size="30px" margin="35px 0 0 5px" title="В корзину" onClick={(event) => handlerAddToBasket(event, id)} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const Product = styled(ProductContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 215px;
  height: 300px;
  text-align: center;
  border: 0px solid black;
  margin: 10px;
  box-shadow: 0px 0px 10px #405060;
  cursor: pointer;
  padding: 5px;

  & img {
    width: 160px;
    padding: 10px;
  }

  & .no-url-image {
    width: 190px;
    height: 150px;
    background-image: url('https://china-motor.ru/img/placeholder.jpg');
    background-repeat: no-repeat;
    background-size: 190px;
  }

  & .product-image {
    margin-bottom: 10px;
  }

  & .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 0px solid black;
  }

  & .product-info-2 {
    display: flex;
    flex-direction: row;

    & i {
      color: #405060;
    }
  }

  & .product-cost {
    border: 0px solid black;
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: flex-start;
    font-size: 14px;
    line-height: 20px;

    & div {
      display: flex;
      flex-direction: row;
    }
  }
`;
