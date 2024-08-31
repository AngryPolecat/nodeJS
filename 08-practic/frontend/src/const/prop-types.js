import PropTypes from 'prop-types';
import { ROLE } from '.';

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPES = {
  ROLE: ROLE_ID,
  ROLE_NAME: PropTypes.shape({
    id: ROLE_ID,
    name: PropTypes.string.isRequired,
  }),
  ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
  COMMENT: PropTypes.shape({
    id: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
  POST: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.exact(null)]),
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    publishedAt: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.exact(null)]),
  }),
};
