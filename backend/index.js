require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { default: DB } = require("./utils/dbhandler")
const { default: UsersFactory } = require("./controllers/UsersFactory")

const app = express()
app.use(cors())
const PORT = process.env.PORT | "3000"

app.listen(PORT, async () => {
    console.log(`Serveur en local sur http://localhost:${PORT}`)

    const db = await DB.connect()

    const user = await UsersFactory.createUser("user", "bob1@mail.com", "bob", "dylan", "boddylan", "photo.jpg", [], "test");
    const admin = await UsersFactory.createUser("admin", "john@mail.com", "john", "dylan","johndylan", "photo.jpg", [], "test");
    const moderator = await UsersFactory.createUser("moderator", "david@mail.com", "david", "dylan", "daviddylan", "photo.jpg", [], "test");

    
    console.log(user.username)
    console.log(admin.username)
    console.log(moderator.username)

    admin.banUser(10)

    moderator.deleteMessage(1520)
})

