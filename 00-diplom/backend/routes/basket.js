const express = require('express');
const hasRole = require('../middlewares/hasRole');
const auth = require('../middlewares/auth');
const { getBasket, deleteBasket, addProduct, deleteProduct } = require('../controllers/basket');
const { getProduct } = require('../controllers/product');
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

router.post('/', auth, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
  try {
    // добавление товара в корзину
    const wasAdded = await addProduct(req.user.id, req.body.product);
    if (wasAdded) {
      const product = await getProduct(req.body.product);
      res.send({ data: mapBasket(product) });
    } else {
      res.send({ data: null });
    }
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.delete('/', auth, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
  try {
    // удаление корзины пользователя req.user.id
    await deleteBasket(req.user.id);
    res.send({ error: false });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.patch('/', auth, hasRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]), async (req, res) => {
  try {
    await deleteProduct(req.user.id, req.body.productId);
    res.send({ error: false });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;
