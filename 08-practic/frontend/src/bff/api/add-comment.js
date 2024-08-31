import { URL } from '../../config'
import { getRandomDate } from '../utils'

export const addComment = (authorId, postId, content) => {
  return fetch(`${URL}/comments`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      author_id: authorId,
      post_id: postId,
      published_at: getRandomDate(),
      content,
    }),
  })
}
