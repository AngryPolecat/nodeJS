const mapUser = (user) => {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    createdAt: user.createdAt,
  }
}

module.exports = mapUser
