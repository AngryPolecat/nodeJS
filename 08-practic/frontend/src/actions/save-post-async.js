import { setPostData } from '.';
import { request } from '../utils';

export const savePostAsync = (postId, newDataPost) => (dispatch) => {
  const saveRequest = postId ? request(`/posts/${postId}`, 'PATCH', newDataPost) : request(`/posts`, 'POST', newDataPost);
  return saveRequest.then((updatedPost) => {
    dispatch(setPostData(updatedPost.data));

    return updatedPost.data;
  });
};
