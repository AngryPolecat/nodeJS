const express = require('express');
const { getGroups } = require('../controllers/catalog');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const groups = await getGroups();
  res.send({ data: groups });
});

// app.post('/catalog', hasRole([ROLES.ADMIN]), async (req, res) => {
//   const group = await addGroup(req.body.group)
//   res.send({ data: group })
// })

// app.patch('/catalog/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
//   const group = await updateGroup(req.params.id, {
//     group: req.body.group,
//   })
//   res.send({ data: group })
// })

// app.delete('/catalog/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
//   await deleteGroup(req.params.id)
//   res.send({ error: null })
// })

module.exports = router;
