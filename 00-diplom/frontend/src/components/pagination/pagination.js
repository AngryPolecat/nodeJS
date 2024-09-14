import { Icon } from '../icon/icon';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, onClickBack, onClickForward, children }) => {
  const handlerClickBack = () => {
    if (page !== 1) {
      onClickBack();
    }
  };

  const handlerClickForward = () => {
    if (page !== lastPage) {
      onClickForward();
    }
  };

  return (
    <div className={className}>
      {lastPage > 1 ? <Icon id="fa-chevron-left" size="30px" margin="10px 0 0 0" title="Предыдущая страница" onClick={handlerClickBack} disabled={Number(page) === 1 ? true : false} /> : null}
      <h3>{children}</h3>
      {lastPage > 1 ? (
        <Icon id="fa-chevron-right" size="30px" margin="10px 0 0 0" title="Следующая страница" onClick={handlerClickForward} disabled={Number(page) === Number(lastPage) ? true : false} />
      ) : null}
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;

  & h3 {
    width: 100%;
  }

  & i {
    color: #405060;
  }
`;
