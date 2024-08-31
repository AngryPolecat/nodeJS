import { getUsers } from '../api';
import { ROLE, ERROR } from '../const';
import { sessions } from '../sessions';

export const fetchUsers = async (userSession) => {
  const accessRole = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  const users = await getUsers();

  return {
    error: null,
    res: users,
  };
};
