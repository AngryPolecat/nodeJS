const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/groups', require('./catalog'));
router.use('/users', require('./user'));
router.use('/basket', require('./basket'));

module.exports = router;
