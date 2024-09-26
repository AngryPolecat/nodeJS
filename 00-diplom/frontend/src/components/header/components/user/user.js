import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import { Icon } from '../../../../components';
import { userRoleSelector, userLoginSelector } from '../../../../selectors';
import { logout, LOGIN } from '../../../../actions';
import { ROLE } from '../../../../const';
import styled from 'styled-components';

const UserContainer = ({ className }) => {
  const inGroup = useMatch('/groups/:groupId/products');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(userLoginSelector);
  const role = useSelector(userRoleSelector);

  const handlerLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  const handlerAuth = () => {
    dispatch(LOGIN);
  };

  return (
    <div className={className}>
      {role === ROLE.GUEST ? (
        <Icon id="fa-user-o" size="64px" margin="10px" onClick={handlerAuth} />
      ) : (
        <div className="user-panel">
          <div className="user-login">
            <span>Приветствуем, {login}!</span>
            <Icon id="fa-sign-out" onClick={handlerLogout} />
          </div>
          <div className="buttons-panel">
            {role === ROLE.ADMIN ? (
              <>
                {inGroup ? (
                  <Link to={inGroup ? `/groups/${inGroup.params.groupId}/products/new` : '/'}>
                    <Icon id="fa-plus-square-o" size="44px" title="Добавить товар" />
                  </Link>
                ) : null}
                <Link to="/groups">
                  <Icon id="fa-book" size="38px" margin="3px 0 0 15px" title="Группы товаров" />
                </Link>
                <Link to="/users">
                  <Icon id="fa-users" size="33px" margin="5px 0 0 15px" title="Редактирование пользователей" />
                </Link>
              </>
            ) : null}
            <Link to="/basket">
              <Icon id="fa-shopping-cart" size="40px" margin="0 0 0 10px" title="Корзина" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export const User = styled(UserContainer)`
  & .buttons-panel {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  & .user-panel {
    margin: 10px 10px 0 0;
  }

  & .user-login {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    & span {
      font-size: 20px;
      margin-right: 20px;
    }
  }
`;
