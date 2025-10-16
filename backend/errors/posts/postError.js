class PostError extends Error
{
    constructor(message, code)
    {
        super(message);
        this.name = "PostError";
        this.code = code
    }
}

module.exports = PostError;
