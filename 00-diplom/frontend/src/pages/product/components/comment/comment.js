import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request } from '../../../../utils';
import { openMessage, CLOSE_MESSAGE, addComment, removeComment } from '../../../../actions';
import { SETTINGS, ROLE } from '../../../../const';
import { Icon, Textarea } from '../../../../components';
import { userRoleSelector, productSelector } from '../../../../selectors';
import styled from 'styled-components';

const CommentContainer = ({ className }) => {
  const role = useSelector(userRoleSelector);
  const { id, group, comments } = useSelector(productSelector);
  const dispatch = useDispatch();
  const [textComment, setTextComment] = useState('');

  const handlerCreateComment = () => {
    request(`/groups/${group}/products/${id}/comments`, 'POST', { content: textComment }).then((comment) => {
      if (comment.error) {
        dispatch(openMessage(comment.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        return;
      }
      setTextComment('');
      dispatch(addComment(comment.data));
    });
  };

  const handlerRemoveComment = (commentId) => {
    request(`/groups/${group}/products/${id}/comments/${commentId}`, 'DELETE').then((result) => {
      if (result.error) {
        dispatch(openMessage(result.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        return;
      }
      dispatch(removeComment(commentId));
    });
  };

  const isModerator = role === ROLE.ADMIN || role === ROLE.MODERATOR ? true : false;
  const isGuest = role === ROLE.GUEST ? true : false;

  return (
    <div className={className}>
      <div>Комментарии</div>
      {!isGuest ? (
        <div className="new-comment">
          <Textarea placeholder="Новый комментарий..." size="14px" name="new-comment" value={textComment} onChange={({ target }) => setTextComment(target.value)} />
          <Icon id="fa-paper-plane-o" size="20px" margin="0 0 0 10px" onClick={handlerCreateComment} />
        </div>
      ) : null}
      <div className="list-comments">
        <ul>
          {comments.map(({ id, content, author, createdAt }) => (
            <li key={id}>
              <div className="comment">
                <div>
                  <strong>{author}</strong>
                </div>
                <div>{createdAt}</div>
                <div>{content}</div>
              </div>
              {isModerator ? (
                <div>
                  <Icon id="fa-trash-o" size="20px" margin="0 0 0 0" onClick={() => handlerRemoveComment(id)} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  margin-bottom: 50px;

  & .new-comment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;
  }

  & textarea {
    width: 100%;
    resize: none;
    min-height: 100px;
  }

  & .list-comments {
    & ul {
      margin: 0;
      padding: 0;
      margin-top: 10px;
    }

    & li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      decoration: none;
      list-style-type: none;
      margin-bottom: 10px;

      & .comment {
        display: flex;
        flex-direction: row;
        justify-content: left;

        & div {
          margin: 0 10px;
          text-align: left;
          font-size: 14px;
        }
      }
    }
  }
`;
