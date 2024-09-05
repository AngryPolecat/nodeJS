import styled from 'styled-components'

const FooterContainer = ({ className }) => {
  return <div className={className}>Created by a Padawan Milovidov VV, 19 ДБЯ</div>
}

export const Footer = styled(FooterContainer)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #405060;
  color: white;
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 17px #000;
  width: 100%;
  height: 30px;
  padding: 10px;
  font-size: 14px;
`
