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

    //const userTest = await UsersFactory.createUser("user", "bob1@mail.com", "bob", "dylan", "photo.jpg", [], "test");

    //console.log(userTest)
})

