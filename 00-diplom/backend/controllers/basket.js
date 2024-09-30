const Basket = require('../models/Basket');
const Product = require('../models/Product');
const mapGroup = require('../helpers/mapGroup');

// добавить товар в корзину
const addProduct = async (userId, productId) => {
  const basket = await Basket.findOne({ user: userId });
  if (!basket) {
    const basket = await Basket.create({ user: userId });
    await Basket.findByIdAndUpdate(basket.id, { $push: { products: productId } });
  } else {
    const products = basket.products;
    const isProductInBasket = products.includes(productId);
    if (!isProductInBasket) {
      await Basket.findByIdAndUpdate(basket.id, { $push: { products: productId } });
    }
  }
};

// удалить товар из корзины
const deleteProduct = async (userId, productId) => {
  // await Comment.deleteOne({ _id: commentId });
  // await Product.findByIdAndUpdate(productId, { $pull: { comments: commentId } });
  return;
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
