const mongoose = require("mongoose"); 

const CommentSchema = new mongoose.Schema(
    {
        description: { type: String, required: true, unique: false },
        post_id : { type: String, required: true, unique: false },
    }
);


const CommentModel = mongoose.model("Comment", CommentSchema);

class Comment
{
    #_description;
    #_post_id;
  

    constructor(postId,description)
    {
        
        this.#_post_id = postId;
        this.#_description = description;
    }


    get description()
    {
        return this.#_description;
    }

    get CommentpostId()
    {
        return this.#_post_id;
    }

    
    /**
     * Static function
     * 
     */

    // Get All Comment
    static async getAllComment()
    {
        try {
            const comentDB = await CommentModel.find({})
            return comentDB.length > 0 ? comentDB : null
        } catch (error) {
            console.log("[Error post]",error)
        }
    }

    //Add comment 

    static async addComment(data)
    {
        try {
            
            const addComment= await CommentModel.create(data)
            return addComment?? null; 

        } catch (error) {
            console.log("[Error comment]",error)
        }
    }

    //Update Comment

    static async updateComment(commentId, updatedFields)
    {
        try {
            
            await CommentModel.findOneAndUpdate({_id:commentId}, 
                updatedFields
            )
            const userDB= await CommentModel.findOne({_id:commentId})
            return userDB ?? null
        } catch (error) {
            console.log("[Error comment]",error)
        }
    }


    // Delete comment
    static async deleteComment(commentId)
    {
        try {
            const commentDB= await CommentModel.findOneAndDelete({_id:commentId}); 
            return commentDB ?? null
        } catch (error) {
            console.log("[Error comment]",error)
        }
    }

    //Instance methods

    async createCommentDB()
    {
        try {
            const commentDB = await CommentModel.create({
                description: this.#_description, 
                post_id : this.#_post_id 
            });

            const comment = commentDB.toJSON()
            
            return comment;
        } catch (error) {
            console.error("Erreur lors de la création du commentaire", error)
            return false
        }
    }

}

module.exports=Comment
