import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { roleSelector } from '../../selectors';
import { Error } from '../error/error';
import { ERROR, PROP_TYPES } from '../../const';

export const PrivateContent = ({ children, serverError = null, access }) => {
  const role = useSelector(roleSelector);
  const accessError = access.includes(role) ? null : ERROR.ACCESS_DENIED;
  const error = serverError || accessError;

  return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
  children: PropTypes.node.isRequired,
  serverError: PROP_TYPES.ERROR,
  access: PropTypes.arrayOf(PROP_TYPES.ROLE).isRequired,
};
