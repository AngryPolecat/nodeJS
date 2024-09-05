import { Link } from 'react-router-dom'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const UserContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/login">
        <Icon id="fa-user-o" size="64px" margin="10px" />
      </Link>
    </div>
  )
}

export const User = styled(UserContainer)``
