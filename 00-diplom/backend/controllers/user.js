const bcrypt = require('bcrypt');
const User = require('../models/User');
const roles = require('../const/roles');
const { createToken } = require('../helpers/token');

const deleteUser = async (id) => await User.deleteOne({ _id: id });

const updateUser = async (id, userData) => await User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });

const register = async (login, password) => {
  if (!password) {
    throw new Error('Пароль не может быть пустым');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });

  const token = createToken({ id: user.id });

  return {
    user,
    token,
  };
};

const login = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Пароль не верный');
  }

  const token = createToken({ id: user.id });

  return {
    user,
    token,
  };
};

const getUsers = async () => await User.find();

const getRoles = () => {
  return [
    {
      id: roles.ADMIN,
      name: 'Администратор',
    },
    {
      id: roles.MODERATOR,
      name: 'Модератор',
    },
    {
      id: roles.USER,
      name: 'Пользователь',
    },
  ];
};

module.exports = {
  login,
  register,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
