class CommentError extends Error
{
    constructor(message, code)
    {
        super(message);
        this.name = "CommentError";
        this.code = code
    }
}

module.exports = CommentError;
