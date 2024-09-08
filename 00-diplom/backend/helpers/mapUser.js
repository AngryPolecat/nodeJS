const mapUser = (user) => {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    createdAt: user.createdAt.toLocaleDateString().padStart(10, '0'),
  };
};

module.exports = mapUser;
