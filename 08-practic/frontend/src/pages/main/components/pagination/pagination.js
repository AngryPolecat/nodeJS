import { Button } from '../../../../components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CurrentPage = styled.div`
  font-size: 20px;
  line-height: 40px;
  margin: 0 10px;
`;

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      {lastPage > 1 && (
        <>
          <Button disabled={page - 1 ? false : true} width="120px" onClick={() => setPage(1)}>
            В начало
          </Button>
          <Button disabled={page - 1 ? false : true} width="120px" onClick={() => setPage(page - 1)}>
            Предыдущая
          </Button>
          <CurrentPage className="current-page">{page}</CurrentPage>
          <Button disabled={page === lastPage ? true : false} width="120px" onClick={() => setPage(page + 1)}>
            Следующая
          </Button>
          <Button disabled={page === lastPage ? true : false} width="120px" onClick={() => setPage(lastPage)}>
            В конец
          </Button>
        </>
      )}
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  margin: 0 auto 140px;
  width: 600px;

  & button {
    margin: 5px 10px;
  }
`;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
