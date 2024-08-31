import { useState } from 'react';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { request } from '../../../../utils';
import { PROP_TYPES } from '../../../../const';

const UserRowContainer = ({ className, id: userId, login, registeredAt, roleId: userRoleId, roles, onRemoveUser }) => {
  const [selectedRole, setSelectedRole] = useState(userRoleId);
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);

  const handlerChangeRole = ({ target }) => {
    setSelectedRole(Number(target.value));
  };

  const handlerSaveUserRole = (userId, newUserRoleId) => {
    request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
      setInitialRoleId(selectedRole);
    });
  };

  const isSaveButtonDisabled = selectedRole === initialRoleId;

  return (
    <div className={className}>
      <TableRow border>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>
        <div className="role-column">
          <select value={selectedRole} onChange={handlerChangeRole}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option value={roleId} key={roleId}>
                {roleName}
              </option>
            ))}
          </select>
          <Icon id="fa-floppy-o" margin="0 0 0 10px" disabled={isSaveButtonDisabled} onClick={() => handlerSaveUserRole(userId, selectedRole)} />
        </div>
      </TableRow>
      <Icon id="fa-trash-o" margin="11px 0 0 10px" onClick={onRemoveUser} />
    </div>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPES.ROLE.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPES.ROLE_NAME).isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};
