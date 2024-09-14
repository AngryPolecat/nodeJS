const express = require('express');
const auth = require('../middlewares/auth');
const hasRole = require('../middlewares/hasRole');
const { addGroup, getGroups, updateGroup, deleteGroup } = require('../controllers/catalog');
const { addProduct, getProducts, getProduct, updateProduct } = require('../controllers/product');
const mapProduct = require('../helpers/mapProduct');
const ROLES = require('../const/roles');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const { groups, lastPage } = await getGroups(req.query.limit, req.query.page);
    res.send({ data: groups, lastPage });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get('/:id/products', async (req, res) => {
  try {
    const { products, lastPage } = await getProducts(req.params.id, req.query.limit, req.query.page);
    res.send({ data: products, lastPage });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get('/:id/products/:productId', async (req, res) => {
  try {
    const product = await getProduct(req.params.productId);
    res.send({ data: mapProduct(product[0]) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post('/:id/products', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const product = await addProduct({
      title: req.body.title,
      image: req.body.url,
      cost: Number(req.body.cost),
      count: Number(req.body.count),
      description: req.body.description,
      group: req.body.group,
    });
    res.send({ data: product });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post('/', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const group = await addGroup({
      group: req.body.group.title,
      image: req.body.group.url,
    });
    res.send({ data: group });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get('/:id'),
  async (req, res) => {
    try {
      res.send({ data: products });
    } catch (e) {
      res.send({ error: e.message });
    }
  };

router.patch('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const group = await updateGroup(req.params.id, {
      group: req.body.group.title,
      image: req.body.group.url,
    });
    res.send({ data: group });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.patch('/:id/products/:productId', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const product = await updateProduct(req.params.productId, {
      title: req.body.title,
      image: req.body.url,
      cost: Number(req.body.cost),
      count: Number(req.body.count),
      description: req.body.description,
      group: req.body.group,
    });
    res.send({ data: mapProduct(product) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.delete('/:id', auth, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    await deleteGroup(req.params.id);
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;
