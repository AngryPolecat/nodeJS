import styled from 'styled-components'

const IconContainer = ({ className, id, ...props }) => (
  <div className={className}>
    <i className={`fa ${id}`} aria-hidden="true" {...props}></i>
  </div>
)

export const Icon = styled(IconContainer)`
  font-size: ${({ size = '20px' }) => size};
  margin: ${({ margin = 0 }) => margin};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
