import { URL } from '../../config'

export const removeComment = async (commentId) =>
  fetch(`${URL}/comments/${commentId}`, {
    method: 'DELETE',
  })
