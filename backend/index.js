require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { default: DB } = require("./utils/dbhandler")

const app = express()
app.use(cors())
const PORT = process.env.PORT | "3000"

const db = new DB()

db.connect()

app.listen(PORT, () => {
    console.log(`Serveur en local sur http://localhost:${PORT}`)
})

