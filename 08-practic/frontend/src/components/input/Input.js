import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
  return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
  padding: 10px;
  font-size: ${({ size = '20px' }) => size};
  margin: 0 0 10px 0;
`;
