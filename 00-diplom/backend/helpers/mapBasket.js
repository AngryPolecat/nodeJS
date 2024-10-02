const mongoose = require('mongoose');

const mapBasket = (product) => {
  return {
    id: product.id,
    title: product.title,
    url: product.image,
    count: product.count,
    cost: product.cost,
    group: product.group.group,
    item: 1,
  };
};

module.exports = mapBasket;
