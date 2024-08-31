import { useState } from 'react';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { roleSelector } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { ROLE, PROP_TYPES } from '../../../../const';
import { checkAccess } from '../../../../utils';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewComment = styled.textarea`
  width: 100%;
  resize: none;
  height: 100px;
`;

const CommentsContainer = ({ className, comments, postId }) => {
  const role = useSelector(roleSelector);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();
  const hasPermissionsReader = checkAccess([ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER], role);

  const handlerChangeComment = ({ target }) => {
    setNewComment(target.value);
  };

  const handlerAddComment = () => {
    /** комментарий добавляется даже после разлогирования, но только 1 раз */
    dispatch(addCommentAsync(postId, newComment));
    setNewComment('');
  };

  return (
    <div className={className}>
      {hasPermissionsReader && (
        <div className="container-textarea">
          <NewComment name="comment" value={newComment} onChange={handlerChangeComment} placeholder="Комментарий..."></NewComment>
          <Icon id="fa-paper-plane-o" margin="0 0 0 10px" size="18px" onClick={() => handlerAddComment()} />
        </div>
      )}
      <div className="container-comments">
        {comments.map(({ id, publishedAt, content, author }) => (
          <Comment key={id} id={id} publishedAt={publishedAt} content={content} author={author} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
  & .container-textarea {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    width: 580px;
  }

  & .container-comments {
    margin-bottom: 140px;
  }
`;

Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPES.COMMENT).isRequired,
  postId: PropTypes.string.isRequired,
};
