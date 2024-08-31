import { Routes, Route } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Footer, Modal, Error } from './components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { setUser } from './actions';
import { ERROR } from './const';
import styled from 'styled-components';

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  background-color: #fff;
  margin: 0 auto;
`;

const Page = styled.div`
  text-align: center;
  margin-top: 120px;
`;

export const Blog = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/post/:postId/edit" element={<Post />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColumn>
  );
};
