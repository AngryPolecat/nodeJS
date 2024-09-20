const mongoose = require('mongoose')
const mapComment = require('../helpers/mapComment')

const mapProduct = (product) => {
  return {
    id: product.id,
    title: product.title,
    url: product.image,
    count: product.count,
    cost: product.cost,
    description: product.description,
    createdAt: product.createdAt.toLocaleDateString().padStart(10, '0'),
    comments: product.comments.map((comment) => mapComment(comment)),
    group: product.group,
  }
}

module.exports = mapProduct
