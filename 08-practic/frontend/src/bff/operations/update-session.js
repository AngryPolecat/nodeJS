import { sessions } from '../sessions'

export const updateSession = async (userSession, user) => {
  sessions.update(userSession, user)

  return {
    error: null,
    res: true,
  }
}
