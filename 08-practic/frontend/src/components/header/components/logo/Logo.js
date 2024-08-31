import { Link } from 'react-router-dom';
import { Icon } from '../../..';
import styled from 'styled-components';

const ContainerText = styled.div`
  margin: 10px;
`;

const BlogText = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const WebText = styled.div`
  font-size: 16px;
`;

const LogoContainer = ({ className }) => (
  <Link className={className} to="/">
    <Icon id="fa-code" size="64px" />
    <ContainerText>
      <BlogText>Блог</BlogText>
      <WebText>веб-разработчика</WebText>
    </ContainerText>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;
  flex-direction: row;
`;
