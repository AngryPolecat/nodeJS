import { Routes, Route, useNavigate } from 'react-router-dom'
import { Header, Footer, Authorization, Registration, Message } from './components'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Modal, Error } from './components';
import { setUser } from './actions'
// import { ERROR } from './const';
import { Main, Users, Basket, Groups, Products, Product } from './pages'
import { flagLoginSelector, flagRegisterSelector, messageSelector } from './selectors'
import styled from 'styled-components'

const App = styled.div`
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  text-align: center;
  margin-top: 100px;
`

export const Shop = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stateFlagLogin = useSelector(flagLoginSelector)
  const stateFlagRegister = useSelector(flagRegisterSelector)
  const message = useSelector(messageSelector)

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData')

    if (!currentUserDataJSON) {
      return
    }

    const currentUserData = JSON.parse(currentUserDataJSON)

    dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }))
  }, [dispatch, navigate])

  return (
    <App>
      <Header />
      {stateFlagLogin ? <Authorization /> : null}
      {stateFlagRegister ? <Registration /> : null}
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/users" element={<Users />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<Products />} />
          <Route path="/groups/:groupId/products/new" element={<Product />} />
          <Route path="/groups/:groupId/products/:productId" element={<Product />} />
          <Route path="/groups/:groupId/products/:productId/edit" element={<Product />} />
        </Routes>
      </Page>
      {message.status ? <Message text={message.text} /> : null}
      <Footer />
    </App>
  )
}

// // <Header />
// //{' '}
// <Page>
//   //{' '}
//   <Routes>
//     // <Route path="/" element={<Main />} />
//     // <Route path="/login" element={<Authorization />} />
//     // <Route path="/register" element={<Registration />} />
//     // <Route path="/post" element={<Post />} />
//     // <Route path="/post/:postId" element={<Post />} />
//     // <Route path="/post/:postId/edit" element={<Post />} />
//     // <Route path="/users" element={<Users />} />
//     // <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
//     //{' '}
//   </Routes>
//   //{' '}
// </Page>
// // <Footer />
// // <Modal />
