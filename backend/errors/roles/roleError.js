class RoleError extends Error
{
    constructor(message, code)
    {
        super(message);
        this.name = "RoleError";
        this.code = code
    }
}

module.exports = RoleError;
