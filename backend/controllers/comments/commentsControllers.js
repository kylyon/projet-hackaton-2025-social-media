const Comment = require ("../../models/Comments");

// Get all comments
const getComments = async (req, res) => {
  try {
    
        const data = await Comment.getAllComment()      
        res.status(200).json({ message: `Request success`, data: data });

    } catch(error){
        console.error("Error server : can't get all data ");
        return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

// Get Comment by ID
const getCommentById = async (req, res) => {
 
  const CommentInput = req.params.id;

  try {

      const CommentID = await Comment.findCommentId(
            {
                _id: CommentInput,
            }
        )

      if(!CommentID) return res.status(401).json({message: "Comment not find", status: 401});

      const data = CommentID[0]; 
      
      res.status(200).json({ message: `Request success`, data: data });
  }
  catch(error){
      console.error("Error when get Comment by id:", error);
      return res.status(500).json({ message: "Internal server error", status: "500" });
  }

};

// Create a new comment
const createComment = async (req, res) => {
      
      const CommentField = req.body;
      // Check if all required fields are present

      const {description, post_id} =CommentField
    
       try {
      
          if(!description ||  !post_id){
            return res.status(400).json({ message: "Missing parameters", status: "400" }); 
          }
          // Create new Comment
      
          const newComment = await Comment.addComment(CommentField);
      
          // Check if Comment creation was successful
          if(!newComment) return res.status(400).json({ message: "Error creating Comment", status: "400" });
      
          // Respond with success message and created Comment
          return res.status(200).json({ message: `Comment created successfully`, status: "200" });
      
        } catch (error) {
      
          console.error("Error creating Comment:", error);
      
          return res.status(500).json({ message: "Internal server error", status: "500" });
        }
};

// Update comment
const updateComment = async (req, res) => {

    const CommentId = req.params.id;
    const updatedFields=req.body; 
     
    try {
  
        const updateComment = await Comment.updateComment(CommentId,updatedFields)
        
        if(!updateComment) return res.status(500).json({message: "Update Comment Failed", status: 401});
        
        res.status(200).json({ message: `Comment update successfully`, data : updateComment});
  
    }catch(error){
        console.error("Error when update Comment by id:", error);
        return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

// Delete comment
const deleteComment = async (req, res) => {

  const CommentId = req.params.id;
      
      try {
          const updateComment = await Comment.deleteComment(CommentId)
    
          if(!updateComment) return res.status(500).json({message: "Failed delete Comment", status: 401});
          
          res.status(200).json({ message: `Comment delete successfully`, data : updateComment});
    
      }catch(error){
          console.error("Error when delete Comment by id:", error);
          return res.status(500).json({ message: "Internal server error", status: "500" });
      }
};

module.exports = {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};
