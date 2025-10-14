require("dotenv").config()

const express = require("express")
const cors = require("cors")
const DB = require("./utils/dbhandler");

const app = express()
app.use(cors()) // Middleware pour gérer les erreurs CORS
app.use(express.json()) // Middleware pour parser le JSON


//  Bloque la connexion en test

if (process.env.NODE_ENV !== "test") {   
  const db = new DB();
  db.connect();
}


// Import des routes

const userRoutes = require("./routes/users")
app.use("/users", userRoutes)

app.get("/", (req, res) => {
  res.status(200).send({ message: "API Hackathon 2025 is running", status: "200" });
}); 

module.exports = app // Export de l'application pour l'utiliser dans server.js

