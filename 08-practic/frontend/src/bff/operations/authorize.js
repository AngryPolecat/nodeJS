import { getUser } from '../api'
import { sessions } from '../sessions'

export const authorize = async (authLogin = null, authPassword = null) => {
  const user = await getUser(authLogin)

  if (!user) {
    return {
      error: 'Логин не верный',
      res: null,
    }
  }

  const { id, login, password, roleId } = user

  if (password !== authPassword) {
    return {
      error: 'Пароль не верный',
      res: null,
    }
  }

  return {
    error: null,
    res: {
      id,
      login,
      roleId,
      session: sessions.create(user),
    },
  }
}
