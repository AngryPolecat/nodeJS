module.exports = function (user) {
  return {
    login: user.login,
    id: user.id,
    roleId: user.role,
    registeredAt: user.createdAt.toLocaleDateString().padStart(10, '0'),
  };
};
