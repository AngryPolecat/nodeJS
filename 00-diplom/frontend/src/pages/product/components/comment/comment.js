import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { request } from '../../../../utils'
import { openMessage, CLOSE_MESSAGE, setProduct } from '../../../../actions'
import { SETTINGS, ROLE } from '../../../../const'
import { Icon, Textarea } from '../../../../components'
import { userRoleSelector, productSelector } from '../../../../selectors'
import styled from 'styled-components'

const CommentContainer = ({ className }) => {
  const role = useSelector(userRoleSelector)
  const { id, groupId, comments } = useSelector(productSelector)
  const dispatch = useDispatch()
  const [textComment, setTextComment] = useState('')

  const handlerCreateComment = () => {
    request(`/groups/${groupId}/products/${id}/comments`, 'POST', { content: textComment }).then((comment) => {
      if (comment.error) {
        dispatch(openMessage(comment.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT)
        return
      }
      setTextComment('')
      dispatch(setProduct(id))
    })
  }
  console.log(comments)

  return (
    <div className={className}>
      <div>Комментарии</div>
      {role !== ROLE.GUEST ? (
        <div className="new-comment">
          <Textarea placeholder="Новый комментарий..." size="14px" name="new-comment" value={textComment} onChange={({ target }) => setTextComment(target.value)} />
          <Icon id="fa-paper-plane-o" size="20px" margin="0 0 0 10px" onClick={handlerCreateComment} />
        </div>
      ) : null}
      <div className="list-comments"></div>
    </div>
  )
}

export const Comment = styled(CommentContainer)`
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
`
