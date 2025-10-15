const getRoles = (req, res) => {
  res.status(200).json({ message: "Role route is working", status: "200" });
};

module.exports = {
  getRoles
};
