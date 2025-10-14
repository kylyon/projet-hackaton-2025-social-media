const getUsers = (req, res) => {
  res.status(200).json({ message: "User route is working", status: "200" });
};

module.exports = {
  getUsers
};
