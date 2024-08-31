const express = require('express');
const auth = require('../middlewares/auth');
const { getUsers, updateUser, deleteUser, getRoles } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../const/roles');

const router = express.Router({ mergeParams: true });

router.get('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ data: users.map((user) => mapUser(user)) });
});

router.patch('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const user = await updateUser(req.params.id, {
    role: req.body.roleId,
  });
  res.send({ data: mapUser(user) });
});

router.delete('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);
  res.send({ error: null });
});

router.get('/roles', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();
  res.send({ data: roles });
});

module.exports = router;
