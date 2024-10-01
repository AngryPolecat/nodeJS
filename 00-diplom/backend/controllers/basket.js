const Basket = require('../models/Basket')

// добавить товар в корзину
const addProduct = async (userId, productId) => {
  let basket = await Basket.findOne({ user: userId }).populate({ path: 'products', populate: 'group' })
  console.log(basket)

  if (!basket) {
    basket = await Basket.create({ user: userId })
    await Basket.findByIdAndUpdate(basket.id, { $push: { products: productId } }).populate({ path: 'products', populate: 'group' })
    console.log(basket)
  }
  // const products = basket.products
  // const isProductInBasket = products.includes(productId)
  // if (!isProductInBasket) {
  //   await Basket.findByIdAndUpdate(basket.id, { $push: { products: productId } })
  // }
  // return products
}

// удалить товар из корзины
const deleteProduct = async (userId, productId) => await Basket.findOneAndUpdate({ user: userId }, { $pull: { products: productId } }).populate({ path: 'products', populate: 'group' })

// удалить корзину
const deleteBasket = async (userId) => {}

// получить корзину
const getBasket = async (userId) => {
  const data = await Basket.findOne({ user: userId }).populate({ path: 'products', populate: 'group' })
  const products = data.products

  return products
}

module.exports = {
  addProduct,
  deleteProduct,
  deleteBasket,
  getBasket,
}
