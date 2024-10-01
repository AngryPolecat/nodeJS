const Basket = require('../models/Basket');

// добавить товар в корзину
const addProduct = async (userId, productId) => {
  let basket = await Basket.findOne({ user: userId });
  if (!basket) {
    basket = await Basket.create({ user: userId });
  }

  const isProductInBasket = basket.products.includes(productId);

  if (!isProductInBasket) {
    basket = await Basket.findByIdAndUpdate(basket.id, { $push: { products: productId } }, { returnDocument: 'after' });
  }
  await basket.populate({ path: 'products', populate: 'group' });
  return basket.products;
};

// удалить товар из корзины
const deleteProduct = async (userId, productId) => {
  const basket = await Basket.findOneAndUpdate({ user: userId }, { $pull: { products: productId } }, { returnDocument: 'after' }).populate({ path: 'products', populate: 'group' });
  return basket.products;
};

// удалить корзину
const deleteBasket = async (userId) => {};

// получить корзину
const getBasket = async (userId) => {
  const data = await Basket.findOne({ user: userId }).populate({ path: 'products', populate: 'group' });
  const products = data.products;

  return products;
};

module.exports = {
  addProduct,
  deleteProduct,
  deleteBasket,
  getBasket,
};
