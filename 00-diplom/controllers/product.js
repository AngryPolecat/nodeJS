const Product = require('../models/Product')

// добавить продукт
const addProduct = async (product) => await Product.create(product)

// удалить продукт
const deleteProduct = async (id) => await Product.deleteOne({ _id: id })

// поправить продукт
const updateProduct = async (id, product) => await Product.findByIdAndUpdate(id, product, { returnDocument: 'after' })

// список продуктов
const getProducts = async (group) => await Product.find({ group })

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
}
