const Product = require('../models/Product');
const SETTINGS = require('../const/settings');
const mapProduct = require('../helpers/mapProduct');

// добавить продукт
const addProduct = async (product) => {
  const newProduct = await Product.create({ ...product });
  await newProduct.populate({
    path: 'comments',
    populate: 'author',
  });
  return newProduct;
};

// удалить продукт
const deleteProduct = async (id) => await Product.deleteOne({ _id: id });

// поправить продукт
const updateProduct = async (id, product) =>
  await Product.findByIdAndUpdate(id, product, { returnDocument: 'after' }).populate({
    path: 'comments',
    populate: 'author',
  });

// список продуктов
const getProducts = async (group, limit = SETTINGS.MAX_PRODUCTS_ON_PAGE, page = 1) => {
  const [products, count] = await Promise.all([
    Product.find({ group })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created: -1 })
      .populate({
        path: 'comments',
        populate: 'author',
      }),
    Product.countDocuments(),
  ]);

  return {
    products: products.map((product) => mapProduct(product)),
    lastPage: Math.ceil(count / limit),
  };
};

// получить продукт
const getProduct = async (productId) =>
  await Product.find({ _id: productId }).populate({
    path: 'comments',
    populate: 'author',
  });

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
};
