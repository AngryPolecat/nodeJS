const mapComment = (comment) => {
  return {
    id: comment.id,
    content: comment.content,
    author: comment.author.login,
    createdAt: comment.createdAt.toLocaleDateString().padStart(10, '0'),
  }
}

module.exports = mapComment
