import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User } from './components/user/user'
import { request } from '../../utils'
import { openMessage, CLOSE_MESSAGE } from '../../actions'
import styled from 'styled-components'

const UsersContainer = ({ className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [updateUsers, setUpdateUsers] = useState(false)

  useEffect(() => {
    Promise.all([request('/users', 'GET'), request('/users/roles', 'GET')]).then(([users, roles]) => {
      if (users.error || roles.error) {
        dispatch(openMessage(users.error || roles.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), 4000)
        navigate('/')
        return
      }
      setUsers(users.data)
      setRoles(roles.data)
    })
  }, [dispatch, navigate, updateUsers])

  return (
    <div className={className}>
      <h3>Пользователи</h3>
      <ul>
        {users.map((user) => {
          return <User key={user.id} user={user} roles={roles} onUpdateUsers={() => setUpdateUsers(!updateUsers)} />
        })}
      </ul>
    </div>
  )
}

export const Users = styled(UsersContainer)`
  width: 1000px;
  margin: 0 auto;
`
