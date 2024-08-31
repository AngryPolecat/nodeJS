import { useState, useEffect } from 'react';
import { UserRow, TableRow } from './components';
import { PrivateContent } from '../../components';
import { ROLE } from '../../const';
import { request } from '../../utils';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  useEffect(() => {
    Promise.all([request('/users/roles', 'GET'), request('/users', 'GET')]).then(([rolesRes, usersRes]) => {
      if (rolesRes.error || usersRes.error) {
        setErrorMessage(rolesRes.error || usersRes.error);
        return;
      }
      setRoles(rolesRes.data);
      setUsers(usersRes.data);
    });
  }, [shouldUpdateUserList]);

  const handlerRemoveUser = (userId) => {
    request(`/users/${userId}`, 'DELETE').then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div className={className}>
      <PrivateContent serverError={errorMessage} access={[ROLE.ADMIN]}>
        <>
          <h2>Пользователи</h2>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата регистрации</div>
            <div className="role-column">Роль</div>
          </TableRow>
          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow key={id} id={id} login={login} registeredAt={registeredAt} roleId={roleId} roles={roles.filter(({ id }) => id !== ROLE.GUEST)} onRemoveUser={() => handlerRemoveUser(id)} />
          ))}
        </>
      </PrivateContent>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 570px;
  margin: 0 auto;
`;
