import { useParams, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { PostContent, Comments, PostForm } from './components';
import { loadPostAsync, RESET_POST } from '../../actions';
import { postSelector } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../const';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
  const params = useParams();
  const isEditing = useMatch('/post/:id/edit');
  const isCreating = useMatch('/post');
  const dispatch = useDispatch();
  const post = useSelector(postSelector);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    dispatch(RESET_POST);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    dispatch(loadPostAsync(params.postId)).then((response) => {
      setError(response.error);
      setIsLoading(false);
    });
  }, [dispatch, params.postId, isCreating, navigate]);

  if (isLoading) {
    return null;
  }

  return error ? (
    <Error error={error} />
  ) : !isEditing && !isCreating ? (
    <div className={className}>
      <PostContent post={post} />
      <Comments comments={post.comments} postId={post.id} />
    </div>
  ) : (
    <PrivateContent access={[ROLE.ADMIN]}>
      <div className={className}>
        <PostForm post={post} />
      </div>
    </PrivateContent>
  );
};

export const Post = styled(PostContainer)`
  display: flex;
  flex-direction: column;

  & .error {
    margin: 20px;
  }
`;
