// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { setUser } from '../../actions';
// import { roleSelector } from '../../selectors';
// import { ROLE } from '../../const';
// import { useResetForm } from '../../hooks';
// import { request } from '../../utils';
import { Link } from 'react-router-dom';
import { AuthError, Input, Icon, Button } from '../../components';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните логин')
    .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
    .min(3, 'Неверно заполнен логин. Минимум 3 символа')
    .max(15, 'неверно заполнен логин. Максимум 15 символов'),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %')
    .min(3, 'Неверно заполнен пароль. Минимум 3 символа')
    .max(30, 'неверно заполнен пароль. Максимум 15 символов'),
});

const AuthorizationContainer = ({ className }) => {
  // const dispatch = useDispatch()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFormSchema),
  });

  // const role = useSelector(roleSelector)
  const [serverError, setServerError] = useState(null);
  // useResetForm(reset)

  const onSubmit = ({ login, password }) => {
    console.log(login, password);
    setServerError(null);
    //   request('/login', 'POST', { login, password }).then(({ error, user }) => {
    //     if (error) {
    //       setServerError(`Ошибка запроса: ${error}`)
    //       return
    //     }
    //     dispatch(setUser(user))
    //     sessionStorage.setItem('userData', JSON.stringify(user))
    //   })
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  // if (role !== ROLE.GUEST) {
  //   return <Navigate to="/" />
  // }

  return (
    <div className={className}>
      <header>
        <Icon id="fa-empire" size="24px" margin="10px" />
        <h3>Авторизация</h3>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input type="text" size="12px" placeholder="Логин..." {...register('login')} />
        <Input type="password" size="12px" placeholder="Пароль..." {...register('password')} />
        <div className="button-container">
          <Link to="/register">
            <Button margin="0">Регистрация</Button>
          </Link>
          <Button margin="0 0 0 10px" disabled={!!formError}>
            Вход
          </Button>
        </div>
        {errorMessage && <AuthError>{errorMessage}</AuthError>}
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  position: fixed;
  right: 5px;
  width: 230px;
  background-color: #405060;
  box-shadow: 0px 0px 17px #000;
  transform: translateX(100%);
  animation: ani 1s forwards;

  @keyframes ani {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  & > header {
    display: flex;
    flex-direction: row;
    color: white;
    font-size: 15px;
    line-height: 12px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }

  & .button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  & a {
    color: black;
  }
`;
