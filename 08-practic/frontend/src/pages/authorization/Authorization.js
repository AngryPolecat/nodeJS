import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setUser } from '../../actions';
import { roleSelector } from '../../selectors';
import { Input, Button } from '../../components';
import { ROLE } from '../../const';
import { AuthError } from '../../components';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';
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

const StyledLink = styled(Link)`
  text-decoration: underline;
  font-size: 12px;
  margin: 10px 0px;
`;

const AuthorizationContainer = ({ className }) => {
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
    },
    resolver: yupResolver(authFormSchema),
  });

  const role = useSelector(roleSelector);
  const [serverError, setServerError] = useState(null);
  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    request('/login', 'POST', { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }

      dispatch(setUser(user));
      sessionStorage.setItem('userData', JSON.stringify(user));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if (role !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          type="text"
          placeholder="Логин..."
          {...register('login', {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register('password', {
            onChange: () => setServerError(null),
          })}
        />
        <Button type="submit" disabled={!!formError} width="300px">
          Авторизация
        </Button>
        {errorMessage && <AuthError>{errorMessage}</AuthError>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
`;
