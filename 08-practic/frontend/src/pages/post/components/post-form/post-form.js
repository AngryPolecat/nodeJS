import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils/sanitize-content';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { PROP_TYPES } from '../../../../const';
import styled from 'styled-components';

const Content = styled.div`
  text-align: left;
  padding: 10px;
  border: 1px solid #000;
  white-space: pre-line;
  font-size: 15px;

  & :focus {
    border: 2px solid #000;
  }
`;

const PostFormContainer = ({ className, post: { id, title, content, imageUrl, publishedAt } }) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const handlerRemovePost = (postId) => {
    dispatch(
      openModal({
        text: 'Удалить статью?',
        onConfirm: () => {
          dispatch(removePostAsync(postId)).then(() => navigate('/'));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const handlerSavePost = (postId) => {
    /** если не залогинен, то ошибка при сохранении TO DO */
    const newContentPost = sanitizeContent(contentRef.current.innerHTML);
    dispatch(savePostAsync(postId, { imageUrl: imageUrlValue, title: titleValue, content: newContentPost })).then(({ id }) => navigate(`/post/${id}`));
  };

  const handlerChangeImageUrl = ({ target }) => setImageUrlValue(target.value);

  const handlerChangeTitle = ({ target }) => setTitleValue(target.value);

  return (
    <div className={className}>
      <div className="special-panel">
        <div className="published-at">
          {publishedAt && <Icon id="fa-calendar" margin="0 10px 0 1px" size="15px" />}
          <div>{publishedAt}</div>
        </div>
        <div className="buttons-panel">
          <Icon id="fa-floppy-o" margin="0 0 0 0" size="20px" onClick={() => handlerSavePost(id)} />
          {publishedAt && <Icon id="fa-trash" margin="0 0 0 10px" size="20px" onClick={() => handlerRemovePost(id)} />}
        </div>
      </div>
      <Input value={imageUrlValue} size="15px" placeholder="URL картинки" onChange={handlerChangeImageUrl} />
      <Input value={titleValue} size="15px" placeholder="Заголовок статьи" onChange={handlerChangeTitle} />
      <Content contentEditable={true} suppressContentEditableWarning={true} ref={contentRef}>
        {content}
      </Content>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  display: flex;
  flex-direction: column;
  padding: 40px 80px 20px 80px;

  & > div,
  h2 {
    text-align: left;
  }

  & .special-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  & .buttons-panel,
  .published-at {
    display: flex;
    flex-direction: row;
    line-height: 20px;
  }
`;

PostForm.propTypes = {
  post: PROP_TYPES.POST.isRequired,
};
