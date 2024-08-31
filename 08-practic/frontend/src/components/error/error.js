import { PROP_TYPES } from '../../const';

export const Error = ({ error }) =>
  error && (
    <>
      <h2>Ошибка</h2>
      <div>{error}</div>
    </>
  );

Error.propTypes = {
  error: PROP_TYPES.ERROR,
};
