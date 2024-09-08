import styled from 'styled-components';

const UserContainer = ({ className, user: { id, login, roleId: selectedRole, createdAt }, roles }) => {
  const handlerChangeRole = () => {};

  return (
    <div className={className}>
      <div className="user-info">
        <div className="user-login">{login}</div>
        <div className="user-created">{createdAt}</div>
        <select value={selectedRole} onChange={handlerChangeRole}>
          {roles.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const User = styled(UserContainer)`
  padding: 5px;

  & .user-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & .user-login {
    width: 30%;
    text-align: left;
  }
`;
