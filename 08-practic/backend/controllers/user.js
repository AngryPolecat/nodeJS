const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const roles = require('../const/roles');

// delete

const deleteUser = async (id) => await User.deleteOne({ _id: id });

// edit (roles)

const updateUser = async (id, userData) => await User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });

// login

const login = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('User not found!');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Password is not valid!');
  }

  const token = generate({ id: user.id });

  return { user, token };
};

// register

const register = async (login, password) => {
  if (!password) {
    throw new Error('Password is empty!');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
};

// get list users

const getUsers = async () => await User.find();

const getRoles = () => {
  return [
    {
      id: roles.ADMIN,
      name: 'Admin',
    },
    {
      id: roles.MODERATOR,
      name: 'Moderator',
    },
    {
      id: roles.USER,
      name: 'User',
    },
  ];
};

module.exports = {
  register,
  login,
  getRoles,
  getUsers,
  deleteUser,
  updateUser,
};
