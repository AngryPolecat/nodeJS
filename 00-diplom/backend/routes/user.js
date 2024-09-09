const express = require('express')
const hasRole = require('../middlewares/hasRole')
const auth = require('../middlewares/auth')
const mapUser = require('../helpers/mapUser')
const { getUsers, getRoles, deleteUser, updateUser } = require('../controllers/user')
const ROLES = require('../const/roles')

const router = express.Router({ mergeParams: true })

router.get('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers()
    res.send({ data: users.map((user) => mapUser(user)) })
  } catch (e) {
    res.send({ error: e.message })
  }
})

router.get('/roles', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const roles = await getRoles()
    res.send({ data: roles })
  } catch (e) {
    res.send({ error: e.message })
  }
})

router.delete('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await deleteUser(req.params.id)
    res.send({ error: false })
  } catch (e) {
    res.send({ error: e.message })
  }
})

router.patch('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const user = await updateUser(req.params.id, {
      role: req.body.role,
    })
    res.send({ data: mapUser(user) })
  } catch (e) {
    res.send({ error: e.message })
  }
})

module.exports = router
