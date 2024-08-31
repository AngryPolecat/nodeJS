import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, ...props }) => (
  <div className={className}>
    <i className={`fa ${id}`} aria-hidden="true" {...props}></i>
  </div>
);

export const Icon = styled(IconContainer)`
  font-size: ${({ size = '20px' }) => size};
  margin: ${({ margin = 0 }) => margin};
  color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

Icon.propTypes = {
  id: PropTypes.string.isRequired,
};
