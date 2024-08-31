import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../const';
import { roleSelector } from '../../../../../../selectors';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
  const role = useSelector(roleSelector);
  const dispatch = useDispatch();
  const hasPermissionsModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], role);

  const handlerRemoveComment = (commentId) => {
    dispatch(
      openModal({
        text: 'Удалить комментарий?',
        onConfirm: () => {
          dispatch(removeCommentAsync(commentId, postId));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon id="fa-user-circle-o" margin="0 10px 0 0" size="16px" />
            {author}
          </div>
          <div className="published-at">
            <Icon id="fa-calendar" margin="0 10px 0 0" size="16px" />
            {publishedAt}
          </div>
        </div>
        <div className="content-data">{content}</div>
      </div>
      {hasPermissionsModerator && <Icon id="fa-trash" margin="0 0 0 10px" size="20px" onClick={() => handlerRemoveComment(id)} />}
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  width: 580px;
  margin: 0 auto;
  border: 0px solid black;
  margin-top: 10px;
  font-size: 15px;

  & .comment {
    border: 1px solid black;
    width: 552px;
    padding: 5px;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .published-at {
    display: flex;
  }

  & .author {
    display: flex;
    margin-bottom: 5px;
  }

  & .content-data {
    text-align: left;
  }
`;

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};
