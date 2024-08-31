import { URL } from '../../config'

export const deletePost = async (postId) => {
  fetch(`${URL}/posts/${postId}`, {
    method: 'DELETE',
  })
}
