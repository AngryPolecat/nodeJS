import { URL } from '../../config';

export const deleteUser = (userId) => {
  fetch(`${URL}/users/${userId}`, {
    method: 'DELETE',
  });
};
