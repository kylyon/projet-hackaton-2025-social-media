// Get all comments
const getComments = (req, res) => {
  res.status(200).json({ message: "Comments route is working", status: "200" });
};

// Create a new comment
const createComment = (req, res) => {
  const comment = req.body;
  res.status(200).json({ message: "Comment create route is working", status: "200", comment });
};

// Update comment
const updateComment = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "Comment update route is working", status: "200", id });
};

// Delete comment
const deleteComment = (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "Comment delete route is working", status: "200", id });
};

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};
