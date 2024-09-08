import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setUser, WAS_LOGIN } from '../../actions';
//import { useResetForm } from '../../hooks';
import { request } from '../../utils';
import { Input, Icon, Button, AuthError } from '../../components';
import styled from 'styled-components';

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Заполните логин')
    .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
    .min(3, 'Неверно заполнен логин. Минимум 3 символа')
    .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
  password: yup
    .string()
    .required('Заполните пароль')
    .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %')
    .min(5, 'Неверно заполнен пароль. Минимум 3 символа')
    .max(30, 'Неверно заполнен пароль. Максимум 15 символов'),
  passcheck: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      passcheck: '',
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  //useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request('/register', 'POST', { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }
      dispatch(setUser(user));
      dispatch(WAS_LOGIN);
      sessionStorage.setItem('userData', JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  return (
    <div className={className}>
      <header>
        <Icon id="fa-empire" size="24px" margin="10px" />
        <h3>Регистрация</h3>
      </header>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" size="12px" placeholder="Логин..." {...register('login')} />
        <Input type="password" size="12px" placeholder="Пароль..." {...register('password')} />
        <Input type="password" size="12px" placeholder="Повторить..." {...register('passcheck')} />
        <Button type="submit" width="100%" disabled={!!formError}>
          Регистрация
        </Button>
        {errorMessage && <AuthError>{errorMessage}</AuthError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  position: fixed;
  right: 5px;
  background-color: #405060;
  width: 230px;
  box-shadow: 0px 0px 17px #000;
  transform: translateX(100%);
  animation: ani 1s forwards;
  top: 100px;

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
    align-items: stretch;
  }
`;
