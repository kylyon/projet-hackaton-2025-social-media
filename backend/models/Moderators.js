import User from "./Users.js";

export default class Moderator extends User
{
    deleteMessage(idMessage)
    {
        console.log(`${this.username} a supprimé le message #${idMessage}`);
    }
}