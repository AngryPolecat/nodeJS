import { URL } from '../../config'
import { postTransformer } from '../transformers'

export const updatePost = async ({ id, imageUrl, title, content }) =>
  fetch(`${URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      content,
      title,
      image_url: imageUrl,
    }),
  })
    .then((response) => response.json())
    .then((post) => {
      return post && postTransformer(post)
    })
