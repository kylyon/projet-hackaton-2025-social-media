// Get all roles
const getRoles = (req, res) => {
  res.status(200).json({ message: "Role route is working", status: "200" });
};

// Create a new role
const createRoles = (req, res) => {
  const role = req.body;
  res.status(200).json({ message: "Role create route is working", status: "200", role });
};

// Update role
const updateRoles = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "Role update route is working", status: "200", id });
};

// Delete role
const deleteRoles = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "Role delete route is working", status: "200", id });
};

module.exports = {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles
};
