const express = require('express');
const hasRole = require('../middlewares/hasRole');
const auth = require('../middlewares/auth');
const mapUser = require('../helpers/mapUser');
const { getUsers, getRoles } = require('../controllers/user');
const ROLES = require('../const/roles');

const router = express.Router({ mergeParams: true });

router.get('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ data: users.map((user) => mapUser(user)) });
});

router.get('/roles', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();
  res.send({ data: roles });
});

module.exports = router;
