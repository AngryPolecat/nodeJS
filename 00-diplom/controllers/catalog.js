const Group = require('../models/Group')

// add group
const addGroup = async (group) => await Group.create({ group })

// del group
const deleteGroup = async (id) => await Group.deleteOne({ _id: id })

// update group
const updateGroup = async (id, group) => await Group.updateOne({ _id: id }, { group })

// get groups
const getGroups = async () => await Group.find()

module.exports = {
  addGroup,
  deleteGroup,
  updateGroup,
  getGroups,
}
