import { ROLE, ERROR } from '../const';
import { sessions } from '../sessions';
import { deleteUser } from '../api';

export const removeUser = async (userSession, userId) => {
  const accessRole = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  deleteUser(userId);

  return {
    error: null,
    res: true,
  };
};
