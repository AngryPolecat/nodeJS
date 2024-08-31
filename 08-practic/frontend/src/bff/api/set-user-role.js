import { URL } from '../../config';

export const setUserRole = (userId, roleId) => {
  fetch(`${URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      role_id: roleId,
    }),
  });
};
