const Group = require('../models/Group');
const mapGroup = require('../helpers/mapGroup');

// add group
const addGroup = async (userData) => {
  const group = await Group.create(userData);
  return mapGroup(group);
};

// del group
const deleteGroup = async (id) => await Group.deleteOne({ _id: id });

// update group
const updateGroup = async (id, userData) => await Group.findByIdAndUpdate(id, userData, { returnDocument: 'after' });

// get groups
const getGroups = async () => {
  const groups = await Group.find();
  return groups.map((group) => mapGroup(group));
};

module.exports = {
  addGroup,
  deleteGroup,
  updateGroup,
  getGroups,
};
