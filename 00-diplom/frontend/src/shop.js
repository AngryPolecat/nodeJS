import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header, Footer, Authorization, Registration, Message, Icon } from './components';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from './components';
import { ERROR } from './const';
import { setUser } from './actions';
import { Main, Users, Basket, Groups, Products, Product } from './pages';
import { flagLoginSelector, flagRegisterSelector, messageSelector } from './selectors';
import styled from 'styled-components';

const App = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const ButtonBackContainer = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <Icon id="fa-hand-o-left" size="30px" margin="0 0 0 0" title="Назад" onClick={() => navigate(-1)} />
    </div>
  );
};

const ButtonBack = styled(ButtonBackContainer)`
  position: fixed;
  right: 10px;
  bottom: 40px;
  background-color: #405060;
  box-shadow: 0px 0px 17px #000;
  z-index: 3;
  color: white;
  padding: 10px;
  border-radius: 10px;
`;

export const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateFlagLogin = useSelector(flagLoginSelector);
  const stateFlagRegister = useSelector(flagRegisterSelector);
  const message = useSelector(messageSelector);

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
  }, [dispatch, navigate]);

  return (
    <App>
      <Header />
      <ButtonBack />
      {stateFlagLogin ? <Authorization /> : null}
      {stateFlagRegister ? <Registration /> : null}
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/users" element={<Users />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId/products" element={<Products />} />
          <Route path="/groups/:groupId/products/new" element={<Product />} />
          <Route path="/groups/:groupId/products/:productId" element={<Product />} />
          <Route path="/groups/:groupId/products/:productId/edit" element={<Product />} />
          <Route path="/403" element={<Main error={ERROR.ACCESS_DENIED} />} />
          <Route path="*" element={<Main error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </Page>
      {message.status ? <Message text={message.text} error={message.error} /> : null}
      <Footer />
      <Modal />
    </App>
  );
};
