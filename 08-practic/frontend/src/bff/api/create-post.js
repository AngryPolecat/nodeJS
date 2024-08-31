import { URL } from '../../config'
import { getRandomDate } from '../utils'
import { postTransformer } from '../transformers'

export const createPost = ({ imageUrl, title, content }) =>
  fetch(`${URL}/posts`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      title,
      content,
      image_url: imageUrl,
      published_at: getRandomDate(),
    }),
  })
    .then((response) => response.json())
    .then((post) => {
      return post && postTransformer(post)
    })
