export const getCountComments = (comments = [], postId) => {
  const postComments = comments.filter((comment) => comment.postId === postId);
  return postComments.length;
};
