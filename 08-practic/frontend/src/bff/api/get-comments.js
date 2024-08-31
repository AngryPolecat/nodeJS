import { commentTransformer } from '../transformers';
import { URL } from '../../config';

export const getComments = (postId) => {
  const url = postId ? `${URL}/comments?post_id=${postId}` : `${URL}/comments`;
  return fetch(url)
    .then((response) => response.json())
    .then((loadComments) => loadComments && loadComments.map(commentTransformer));
};
