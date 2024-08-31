import { userTransformer } from '../transformers'
import { URL } from '../../config'

export const getUsers = () =>
  fetch(`${URL}/users`)
    .then((response) => response.json())
    .then((loadUsers) => loadUsers && loadUsers.map(userTransformer))
