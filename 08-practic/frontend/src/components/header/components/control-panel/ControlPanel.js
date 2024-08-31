import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button } from '../../..';
import { loginSelector, roleSelector } from '../../../../selectors';
import { ROLE } from '../../../../const';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Login = styled.div`
  margin-top: 2px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector(loginSelector);
  const role = useSelector(roleSelector);
  const hasPermissions = checkAccess([ROLE.ADMIN], role);

  const handlerLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('userData');
  };

  return (
    <div className={className}>
      <RightAligned>
        {role === ROLE.GUEST ? (
          <Link to="/login">
            <Button>Войти</Button>
          </Link>
        ) : (
          <>
            <Login>{login}</Login>
            <Icon id="fa-sign-out" size="20px" margin="0 0 0 20px" onClick={handlerLogout} />
          </>
        )}
      </RightAligned>
      <RightAligned>
        <Icon id="fa-backward" size="20px" margin="10px 0 0 20px" onClick={() => navigate(-1)} />
        {hasPermissions && (
          <>
            <Link to="/post">
              <Icon id="fa-file-text-o" size="20px" margin="10px 0 0 20px" />
            </Link>
            <Link to="/users">
              <Icon id="fa-users" size="20px" margin="10px 0 0 20px" />
            </Link>
          </>
        )}
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  margin-top: 10px;
`;
