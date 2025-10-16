const User = require ("./Users.js");

class Moderator extends User
{
    deleteMessage(idMessage)
    {
        console.log(`${this.username} a supprimé le message #${idMessage}`);
    }
}

module.exports = Moderator;