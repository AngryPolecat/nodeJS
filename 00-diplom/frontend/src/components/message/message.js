import styled from 'styled-components';

const MessageContainer = ({ className, text }) => {
  return <div className={className}>{text}</div>;
};

export const Message = styled(MessageContainer)`
  position: fixed;
  right: 5px;
  width: 230px;
  background-color: ${({ error }) => (error ? '#fcadad' : '#00FF7F')};
  color: ${({ error }) => (error ? 'red' : '#006400')};
  transform: translateX(100%);
  animation: ani 1s forwards;
  top: 100px;
  min-height: 100px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${({ error }) => (error ? 'red' : '#006400')};
  border-radius: 5px;
  font-weight: bold;

  @keyframes ani {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
