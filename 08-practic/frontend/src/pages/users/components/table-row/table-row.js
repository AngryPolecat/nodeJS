import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => <div className={className}>{children}</div>;

export const TableRow = styled(TableRowContainer)`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: ${({ border }) => (border ? '1px solid black' : 'none')};

  & > div {
    padding: 10px;
  }

  & .login-column {
    width: 172px;
    text-align: left;
    line-height: 24px;
  }

  & .registered-at-column {
    width: 213px;
    text-align: left;
    line-height: 24px;
  }

  & .role-column {
    display: flex;
    flex-direction: row;
    width: auto;
  }
`;

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};
