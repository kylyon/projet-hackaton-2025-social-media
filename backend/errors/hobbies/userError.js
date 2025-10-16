class HobbyError extends Error
{
    constructor(message, code)
    {
        super(message);
        this.name = "HobbyError";
        this.code = code
    }
}

module.exports = HobbyError;
