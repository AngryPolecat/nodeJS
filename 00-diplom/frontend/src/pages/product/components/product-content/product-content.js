import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userRoleSelector } from '../../../../selectors';
import { ROLE } from '../../../../const';
import { Icon } from '../../../../components';
import { Comment } from '../comment/comment';
import { request } from '../../../../utils';
import { openMessage, CLOSE_MESSAGE, openModal, CLOSE_MODAL } from '../../../../actions';
import { SETTINGS } from '../../../../const';
import styled from 'styled-components';

const ProductContentContainer = ({ className, groupId, product: { id, title, url, description, count, cost } }) => {
  const role = useSelector(userRoleSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handlerRemoveProduct = (productId) => {
    dispatch(
      openModal({
        text: 'Удалить товар?',
        onConfirm: () => {
          request(`/groups/${groupId}/products/${productId}`, 'DELETE').then((result) => {
            dispatch(CLOSE_MODAL);
            if (result.error) {
              dispatch(openMessage(result.error));
              setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
              return;
            }
            navigate(`/groups/${groupId}/products`);
          });
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  return (
    <div className={className}>
      <div className="buttons">
        {role === ROLE.ADMIN ? (
          <>
            <Icon id="fa-shopping-cart" size="24px" margin="5px 0 0 15px" title="В корзину" />
            <Icon id="fa-pencil-square-o" size="25px" margin="6px 0 0 15px" title="Редактировать товар" onClick={() => navigate(location.pathname + '/edit')} />
            <Icon id="fa-trash-o" size="24px" margin="5px 0 0 12px" title="Удалить товар" onClick={() => handlerRemoveProduct(id)} />
          </>
        ) : null}
      </div>
      <div className="product-info">
        <div className="product-header">
          <div className={!url ? 'no-url-image' : null}>{url ? <img src={url} alt="" /> : null}</div>
          <div className="product-title">
            <div>{title}</div>
            <div className="product-cost">
              Цена: <span>{cost}</span>
              <Icon id="fa-btc" size="20px" margin="-4px 0 0 0" />
            </div>
            <div>
              Остаток на складе: <span>{count}</span>
            </div>
          </div>
        </div>
        <div className="product-content">{description}</div>
      </div>
      <hr />
      <Comment />
    </div>
  );
};

export const ProductContent = styled(ProductContentContainer)`
  width: 1000px;
  margin: 0 auto;

  & img {
    width: 200px;
    padding: 10px;
  }

  & .no-url-image {
    width: 200px;
    height: 150px;
    background-image: url('https://china-motor.ru/img/placeholder.jpg');
    background-repeat: no-repeat;
    background-size: 200px;
  }

  & .product-header {
    display: flex;
    flex-direction: row;

    & .product-title {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-left: 10px;

      & div {
        margin-bottom: 10px;
      }

      & spam {
        margin: 0 5px;
      }

      & .product-cost {
        display: flex;
        flex-direction: row;
      }
    }
  }

  & .product-content {
    text-align: justify;
  }

  & .buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
    height: 20px;
  }

  & hr {
    margin: 20px 0;
  }
`;
