import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { User } from './components/user/user';
import { request } from '../../utils';
import { openMessage, CLOSE_MESSAGE, TOGGLE_LOADER } from '../../actions';
import { SETTINGS, ROLE } from '../../const';
import { userRoleSelector } from '../../selectors';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [updateUsers, setUpdateUsers] = useState(false);
  const role = useSelector(userRoleSelector);

  useEffect(() => {
    dispatch(TOGGLE_LOADER);
    Promise.all([request('/users', 'GET'), request('/users/roles', 'GET')]).then(([users, roles]) => {
      dispatch(TOGGLE_LOADER);
      if (users.error || roles.error) {
        dispatch(openMessage(users.error || roles.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        navigate('/');
        return;
      }
      setUsers(users.data);
      setRoles(roles.data);
    });
  }, [dispatch, navigate, updateUsers]);

  if (role !== ROLE.ADMIN) {
    return <Navigate to="/403" />;
  }

  return (
    <div className={className}>
      <h3>Пользователи</h3>
      <ul>
        {users.map((user) => {
          return <User key={user.id} user={user} roles={roles} onUpdateUsers={() => setUpdateUsers(!updateUsers)} />;
        })}
      </ul>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  width: 1000px;
  margin: 0 auto;
`;
