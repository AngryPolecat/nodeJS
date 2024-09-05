const express = require('express');
const hasRole = require('../middlewares/hasRole');
const auth = require('../middlewares/auth');
const { getUsers } = require('../controllers/user');
const ROLES = require('../const/roles');

const router = express.Router({ mergeParams: true });

router.get('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ data: users });
});

module.exports = router;
