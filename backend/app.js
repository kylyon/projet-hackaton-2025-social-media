require("dotenv").config()

const express = require("express")
const cors = require("cors")
const DB = require("./utils/dbhandler");

// Integration de Swagger pour la documentation de l'API
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const app = express()
app.use(cors()) // Middleware pour gérer les erreurs CORS
app.use(express.json()) // Middleware pour parser le JSON


//  Bloque la connexion en test  sinon les tests échouent

if (process.env.NODE_ENV !== "test") {   
  const db = new DB();
  db.connect();
}


// Import des routes

const userRoutes = require("./routes/roles")
app.use("/roles", userRoutes);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 


app.get("/", (req, res) => {
  res.status(200).send({ message: "API Hackathon 2025 is running", status: "200" });
}); 

module.exports = app;

