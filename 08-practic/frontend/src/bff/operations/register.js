import { addUser, getUser } from '../api'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword) => {
  const user = await getUser(regLogin)

  if (user) {
    return {
      error: 'Такой пользователь уже существует',
      res: null,
    }
  }

  const newUser = await addUser(regLogin, regPassword)
  const { id, login, roleId } = newUser

  return {
    error: null,
    res: {
      id,
      login,
      roleId,
      session: sessions.create(newUser),
    },
  }
}
