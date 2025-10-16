import Moderator from "./Moderators.js";

export default class Admin extends Moderator
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