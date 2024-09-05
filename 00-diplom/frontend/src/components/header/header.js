import { Logo } from './components/logo/logo'
import { User } from './components/user/user'
import styled from 'styled-components'

const HeaderContainer = ({ className }) => {
  return (
    <div className={className}>
      <Logo />
      <User />
    </div>
  )
}

export const Header = styled(HeaderContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #405060;
  color: white;
  position: fixed;
  top: 0;
  box-shadow: 0px 0px 17px #000;
  width: 100%;
`
