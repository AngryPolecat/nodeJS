import { URL } from '../../config';
import { ERROR } from '../const';
import { postTransformer } from '../transformers';

export const getPost = (postId) =>
  fetch(`${URL}/posts/${postId}`)
    .then((response) => {
      if (response.ok) {
        return response;
      }

      const error = response.status === 404 ? ERROR.PAGE_NOT_EXIST : ERROR.ERROR_NOT_FOUND;
      return Promise.reject(error);
    })
    .then((response) => response.json())
    .then((post) => {
      return post && postTransformer(post);
    });
