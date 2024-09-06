import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon } from '../../../../components'
import { userRoleSelector, userLoginSelector } from '../../../../selectors'
import { logout } from '../../../../actions'
import { ROLE } from '../../../../const'
import styled from 'styled-components'

const UserContainer = ({ className }) => {
  const dispatch = useDispatch()
  const login = useSelector(userLoginSelector)
  const role = useSelector(userRoleSelector)

  const handlerLogout = () => {
    dispatch(logout())
    sessionStorage.removeItem('userData')
  }

  return (
    <div className={className}>
      {role === ROLE.GUEST ? (
        <Link to="/login">
          <Icon id="fa-user-o" size="64px" margin="10px" />
        </Link>
      ) : (
        <div className="user-panel">
          <div className="user-login">
            <spam>Приветствуем, {login}!</spam>
            <Icon id="fa-sign-out" onClick={handlerLogout} />
          </div>
          <div>{/** TO DO кнопки пользователей */}</div>
        </div>
      )}
    </div>
  )
}

export const User = styled(UserContainer)`
  & .user-panel {
    margin: 10px 10px 0 0;
  }

  & .user-login {
    display: flex;
    flex-direction: row;

    & spam {
      font-size: 20px;
      margin-right: 20px;
    }
  }
`
