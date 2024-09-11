import { forwardRef } from 'react'
import styled from 'styled-components'

const TextareaContainer = forwardRef(({ className, ...props }, ref) => {
  return <textarea className={className} {...props} ref={ref} />
})

export const Textarea = styled(TextareaContainer)`
  display: block;
  border-radius: 5px;
  padding: 7px;
  font-size: ${({ size = '20px' }) => size};
  margin: 0 0 10px 0;
  outline: none;
  color: #212529;
  background-color: #fff;
  border: 1px solid #bdbdbd;
`
