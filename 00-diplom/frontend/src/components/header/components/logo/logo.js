import { Link } from 'react-router-dom'
import { Icon } from '../../../icon/icon'
import styled from 'styled-components'

const LogoContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/">
        <Icon id="fa-empire" size="64px" margin="10px" />
      </Link>
      <div className="name-brend">The brand of the First Star Empire</div>
    </div>
  )
}

export const Logo = styled(LogoContainer)`
  display: flex;
  flex-direction: row;

  & .name-brend {
    font-size: 32px;
    line-height: 90px;
  }
`
