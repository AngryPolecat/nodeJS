import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Icon } from '../../../../components'
import { request } from '../../../../utils'
import { openMessage, CLOSE_MESSAGE } from '../../../../actions'
import styled from 'styled-components'

const UserContainer = ({ className, user: { id, login, roleId: selectedRole, createdAt }, roles, onUpdateUsers }) => {
  const dispatch = useDispatch()
  const [currentRole, setCurrentRole] = useState(selectedRole)
  const [initialRole, setInitialRole] = useState(selectedRole)

  const handlerChangeRole = ({ target }) => {
    setCurrentRole(target.value)
  }

  const handlerRemoveUser = () => {
    request(`/users/${id}`, 'DELETE').then((result) => {
      if (result.error) {
        dispatch(openMessage(result.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), 4000)
        return
      }
      onUpdateUsers()
    })
  }

  const handlerSaveUserRole = () => {
    request(`/users/${id}`, 'PATCH', { role: currentRole }).then((result) => {
      if (result.error) {
        dispatch(openMessage(result.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), 4000)
        return
      }
      setInitialRole(currentRole)
    })
  }

  return (
    <div className={className}>
      <div className="user-info">
        <div className="user-login">{login}</div>
        <div className="user-created">{createdAt}</div>
        <select value={currentRole} onChange={handlerChangeRole}>
          {roles.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
        <div className="user-buttons">
          <Icon id="fa-floppy-o" size="20px" margin="0 0 0 10px" disabled={Number(initialRole) === Number(currentRole) ? true : false} onClick={handlerSaveUserRole} />
          <Icon id="fa-trash-o" size="20px" margin="0 0 0 10px" onClick={handlerRemoveUser} />
        </div>
      </div>
    </div>
  )
}

export const User = styled(UserContainer)`
  padding: 5px;

  & .user-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #405060;
    padding-bottom: 5px;
    font-size: 13px;
    line-height: 20px;

    & select {
      outline: none;
      border: none;
      background: inherit;
    }
  }

  & .user-login {
    width: 30%;
    text-align: left;
  }

  & .user-created {
    width: 40%;
  }

  & .user-buttons {
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`
