import { getRoles } from '../api';
import { ROLE, ERROR } from '../const';
import { sessions } from '../sessions';

export const fetchRoles = async (userSession) => {
  const accessRole = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRole)) {
    return {
      error: ERROR.ACCESS_DENIED,
      res: null,
    };
  }

  const roles = await getRoles();

  return {
    error: null,
    res: roles,
  };
};
