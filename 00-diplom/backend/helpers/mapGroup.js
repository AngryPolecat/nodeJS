const mapGroup = (group) => {
  return {
    id: group.id,
    title: group.group,
    url: group.image,
    createdAt: group.createdAt.toLocaleDateString().padStart(10, '0'),
  };
};

module.exports = mapGroup;
