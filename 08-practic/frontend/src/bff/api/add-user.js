import { URL } from '../../config'
import { getRandomDate } from '../utils'

export const addUser = (login, password) => {
  return fetch(`${URL}/users`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      login,
      password,
      registed_at: getRandomDate(),
      role_id: 2,
    }),
  }).then((response) => response.json())
}
