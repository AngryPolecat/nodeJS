import { URL } from '../../config'

export const getRoles = () => fetch(`${URL}/roles`).then((response) => response.json())
