import { useEffect, useState } from 'react';
import { User } from './components/user/user';
import { request } from '../../utils';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    Promise.all([request('/users', 'GET'), request('/users/roles', 'GET')]).then(([{ data: users }, { data: roles }]) => {
      setUsers(users);
      setRoles(roles);
    });
  }, []);

  return (
    <div className={className}>
      <h3>Пользователи</h3>
      <ul>
        {users.map((user) => {
          return <User key={user.id} user={user} roles={roles} />;
        })}
      </ul>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  width: 1000px;
  margin: 0 auto;
`;
