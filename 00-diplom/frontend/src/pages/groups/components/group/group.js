import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Icon, Input } from '../../../../components'
import { request } from '../../../../utils'
import { openMessage, CLOSE_MESSAGE } from '../../../../actions'
import { SETTINGS } from '../../../../const'
import styled from 'styled-components'

const GroupContainer = ({ className, group: { id, title, url, createdAt }, onUpdateGroups }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [titleValue, setTitleValue] = useState(title)
  const [urlImageValue, setUrlImageValue] = useState(url)

  const handlerSaveGroup = () => {
    request(`/groups/${id}`, 'PATCH', { id, group: { title: titleValue, url: urlImageValue } }).then((res) => {
      if (res.error) {
        dispatch(openMessage(res.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT)
        return
      }
    })
    setEditMode(!editMode)
  }

  const handlerChangeTitle = ({ target }) => setTitleValue(target.value)

  const handlerChangeImageUrl = ({ target }) => setUrlImageValue(target.value)

  const handlerRemoveGroup = () => {
    request(`/groups/${id}`, 'DELETE').then((res) => {
      if (res.error) {
        dispatch(openMessage(res.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT)
        return
      }
      onUpdateGroups()
    })
  }

  return (
    <div className={className}>
      <li>
        <div className="group-image">
          <img src={urlImageValue} alt="" />
        </div>
        <div className="group-info">
          {!editMode ? (
            <>
              <span>{titleValue}</span>
              <span>{urlImageValue ? urlImageValue : 'Картинка отсутствует'}</span>
            </>
          ) : (
            <>
              <Input type="text" name="title" placeholder="Название группы товаров..." value={titleValue} onChange={handlerChangeTitle} />
              <Input type="text" name="url" placeholder="URL картинки группы товаров..." value={urlImageValue} onChange={handlerChangeImageUrl} />
            </>
          )}
          <span>
            <Icon id="fa-calendar" size="13px" margin="0 5px 0 0" />
            {createdAt}
          </span>
        </div>
      </li>
      {!editMode ? (
        <div className="group-buttons">
          <Icon id="fa-pencil-square-o" size="20px" margin="0 0 0 10px" onClick={() => setEditMode(!editMode)} />
          <Icon id="fa-trash-o" size="22px" margin="0 0 0 10px" onClick={handlerRemoveGroup} />
        </div>
      ) : (
        <Icon id="fa-floppy-o" size="20px" margin="0 0 0 10px" onClick={handlerSaveGroup} />
      )}
    </div>
  )
}

export const Group = styled(GroupContainer)`
  display: flex;
  flex-direction: row;

  & li {
    display: flex;
    flex-direction: row;
    border: 2px solid #405060;
    margin-bottom: 5px;
    padding: 10px;
    decoration: none;
    list-style-type: none;
    border-radius: 10px;
    width: 99%;

    & .group-buttons {
      display: flex;
      flex-direction: column;
    }

    & .group-image {
      width: 150px;
      height: 100px;
      background-image: url('https://china-motor.ru/img/placeholder.jpg');
      background-repeat: no-repeat;
      background-size: 150px 100px;
      margin-right: 10px;

      & img {
        width: 150px;
        height: 100px;
      }
    }

    & .group-info {
      display: flex;
      flex-direction: column;
      width: 100%;

      & span {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        padding: 5px;
        text-align: left;
        font-size: 14px;
      }

      & input {
        width: 99%;
        padding: 4px 0 4px 4px;
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
`
