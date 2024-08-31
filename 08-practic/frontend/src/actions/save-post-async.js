import { setPostData } from '.';

export const savePostAsync = (requestServer, newDataPost) => (dispatch) => {
  return requestServer('savePost', newDataPost).then((updatedPost) => {
    dispatch(setPostData(updatedPost.res));

    return updatedPost.res;
  });
};
