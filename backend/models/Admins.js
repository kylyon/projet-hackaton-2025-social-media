const  Moderator = require ("./Moderators.js"); 

class Admin extends Moderator
{
    banUser(idUser)
    {
        console.log(`${this.username} a banni ${idUser}`);
    }

    unbanUser(idUser)
    {
        console.log(`${this.username} a débanni ${idUser}`);
    }
}

module.exports = Admin;