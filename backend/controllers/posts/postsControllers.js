const Post = require ("../../models/Posts");

// Get all Posts
const getPosts = async (req, res) => {

  try {

        const data = await Post.getAllPost()      
        res.status(200).json({ message: `Request success`, data: data });
    } catch(error){
        console.error("Error server : can't get all data ");
        return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

// Create a new Post
const createPost = async (req, res) => {

  const postField = req.body;
  // Check if all required fields are present
  const {description, comment_id, user_id, hobby_id} = postField

   try {
  
      if(!description ||  !comment_id || !user_id || !hobby_id){
        return res.status(400).json({ message: "Missing parameters", status: "400" }); 
      }
      // Create new post
  
      const newPost = await Post.addPost(postField);
  
      // Check if post creation was successful
      if(!newPost) return res.status(400).json({ message: "Error creating post", status: "400" });
  
      // Respond with success message and created post
      return res.status(200).json({ message: `Post created successfully`, status: "200" });
  
    } catch (error) {
  
      console.error("Error creating post:", error);
  
      return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

// Update Post
const updatePost = async (req, res) => {
  
   const postId = req.params.id;
   const updatedFields=req.body; 
 
   try {
 
       const updatePost = await Post.updatePost(postId,updatedFields)
       
       if(!updatePost) return res.status(500).json({message: "Update Post Failed", status: 401});
       
       res.status(200).json({ message: `${postId} update successfully`, data : updatePost});
 
   }catch(error){
       console.error("Error when update post by id:", error);
       return res.status(500).json({ message: "Internal server error", status: "500" });
   }
};

// Delete Post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  
    try {
        const updatePost = await Post.deletePost(postId)
  
        if(!updatePost) return res.status(500).json({message: "Failed delete Post", status: 401});
        
        res.status(200).json({ message: `Post delete successfully`, data : updatePost});
  
    }catch(error){
        console.error("Error when delete post by id:", error);
        return res.status(500).json({ message: "Internal server error", status: "500" });
    }
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};
