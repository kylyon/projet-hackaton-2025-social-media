class UserError extends Error
{
    constructor(message, code, fields = [])
    {
        super(message);
        this.name = "UserError";
        this.code = code
        this.fields = fields
    }
}

module.exports = UserError;
