const Product = require('../models/Product')

// добавить продукт
const addProduct = async (product) => {
  const newProduct = await Product.create({ ...product })
  return newProduct
}

// удалить продукт
const deleteProduct = async (id) => await Product.deleteOne({ _id: id })

// поправить продукт
const updateProduct = async (id, product) => await Product.findByIdAndUpdate(id, product, { returnDocument: 'after' })

// список продуктов
const getProducts = async (group) => {
  const products = await Product.find({ group })
  return products
}

// получить продукт
const getProduct = async (productId) => await Product.find({ _id: productId })

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
}
