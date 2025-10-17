const mongoose = require("mongoose"); 

const PostSchema = new mongoose.Schema(
    {
        description: { type: String, required: true, unique: false },
        comment_id : { type: String, required: false, unique: false },
        user_id : { type: String, required: true, unique: false },
    }
);


const PostModel = mongoose.model("Post", PostSchema);

class Post
{
   
    #_comment_id;
    #_description;
    #_user_id;

  

    constructor(comment_id,description,user_id)
    {
        
        this.#_comment_id = comment_id;
        this.#_description = description;
        this.#_user_id = user_id; 
    }


    get description()
    {
        return this.#_description;
    }

    get PostId()
    {
        return this.#_comment_id;
    }

    get UserId()
    {
        return this.#_user_id;
    }

    
    /**
     * Static function
     * 
     */


    // Get All POst

    static async getAllPost()
    {
        try {
            const postDB = await PostModel.find({})
            return postDB.length > 0 ? postDB : null
        } catch (error) {
            console.log("[Error post]",error)
        }
    }

    //Add Post 

    static async addPost(data)
    {
        try {
            
            const addPost= await PostModel.create(data)
            return addPost?? null; 

        } catch (error) {
            console.log("[Error post]",error)
        }
    }


    //Update Post

    static async updatePost(PostId, updatedFields)
    {
        try {
            
            await PostModel.findOneAndUpdate({_id:PostId}, 
                updatedFields
            )
            const postDB= await PostModel.findOne({_id:PostId})
            return postDB ?? null
        } catch (error) {
            console.log("[Error post]",error)
        }
    }


    // Delete Post
    static async deletePost(PostId)
    {
        try {
            const PostDB= await PostModel.findOneAndDelete({_id:PostId}); 
            return PostDB ?? null
        } catch (error) {
            console.log("[Error post]",error)
        }
    }

    //Instance methods

    async createPostDB()
    {
        try {
            const PostDB = await PostModel.create({
                description: this.#_description, 
                comment_id : this.#_comment_id ,
                user_id : this.#_user_id
            });

            const Post = PostDB.toJSON()
            
            return Post;
        } catch (error) {
            console.error("Erreur lors de la création du Post", error)
            return false
        }
    }

}

module.exports = Post;