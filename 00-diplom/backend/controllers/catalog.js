const Group = require('../models/Group');
const mapGroup = require('../helpers/mapGroup');
const SETTINGS = require('../const/settings');

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
const getGroups = async (limit = SETTINGS.MAX_GROUPS_ON_PAGE, page = 1) => {
  const [groups, count] = await Promise.all([
    Group.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created: -1 }),
    Group.countDocuments(),
  ]);

  return {
    groups: groups.map((group) => mapGroup(group)),
    lastPage: Math.ceil(count / limit),
  };
};

module.exports = {
  addGroup,
  deleteGroup,
  updateGroup,
  getGroups,
};
