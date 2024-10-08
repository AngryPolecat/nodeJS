import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SETTINGS } from '../../const';
import { request } from '../../utils';
import { openMessage, CLOSE_MESSAGE, setGroup, TOGGLE_LOADER } from '../../actions';
import { Group } from './components/group/group';
import { Pagination } from '../../components';
import styled from 'styled-components';

const MainContainer = ({ className, error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useLayoutEffect(() => {
    if (error) {
      dispatch(openMessage(error));
      setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(TOGGLE_LOADER);
    request(`/groups?page=${page}&limit=${SETTINGS.PAGINATION_LIMIT}`).then((groups) => {
      if (groups.error) {
        dispatch(openMessage(groups.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
      }
      setGroups(groups.data);
      setLastPage(groups.lastPage);
      dispatch(TOGGLE_LOADER);
    });
  }, [dispatch, page, navigate]);

  const handlerClickGroup = (group) => {
    dispatch(setGroup(group));
    navigate(`/groups/${group.id}/products`);
  };

  return (
    <div className={className}>
      <Pagination page={page} lastPage={lastPage} onClickBack={() => setPage(page - 1)} onClickForward={() => setPage(page + 1)}>
        Каталог
      </Pagination>
      <div className="groups-container">
        {groups.map((group) => (
          <Group key={group.id} group={group} onClick={() => handlerClickGroup(group)} />
        ))}
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  width: 1000px;
  margin: 0 auto;

  & .groups-container {
    display: flex;
    border: 0px solid black;
    padding: 0 15px;
    flex-wrap: wrap;
  }
`;
