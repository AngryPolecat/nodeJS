const express = require('express');
const hasRole = require('../middlewares/hasRole');
const auth = require('../middlewares/auth');
const { getBasket, deleteBasket, addProduct, deleteProduct } = require('../controllers/basket');
const ROLES = require('../const/roles');
const mapBasket = require('../helpers/mapBasket');

const router = express.Router({ mergeParams: true });

router.get('/', auth, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
  try {
    // получение корзины пользователя req.user.id
    const products = await getBasket(req.user.id);
    res.send({ data: products.map((product) => mapBasket(product)) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    // добавление товара в корзину
    await addProduct(req.user.id, req.body.product);
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.delete('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    // удаление корзины пользователя req.user.id
    // await deleteUser(req.params.id);
    // res.send({ error: false });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.patch('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    // изменение корзины пользователя req.user.id
    // const user = await updateUser(req.params.id, {
    //   role: req.body.role,
    // });
    // res.send({ data: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;
