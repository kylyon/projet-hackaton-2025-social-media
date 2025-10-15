// Get all roles
const getRoles = (req, res) => {
  res.status(200).json({ message: "Role route is working", status: "200" });
};

// Create a new role
const createRoles = (req, res) => {
  res.status(200).json({ message: "Role create route is working", status: "200" });
};

// Update role
const updateRoles = (req, res) => {
  res.status(200).json({ message: "Role update route is working", status: "200" });
};

// Delete role
const deleteRoles = (req, res) => {
  res.status(200).json({ message: "Role delete route is working", status: "200" });
};

module.exports = {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles
};
