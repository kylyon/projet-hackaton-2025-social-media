require("dotenv").config()

const express = require("express")
const cors = require("cors")
const DB = require("./utils/dbhandler");
const cookieParser = require("cookie-parser")

// Integration de Swagger pour la documentation de l'API
const swaggerUi = require('swagger-ui-express');
const {swaggerSpec, swaggerUiOptions} = require('./swagger');



const app = express()
app.use(cors()) // Middleware pour gérer les erreurs CORS
app.use(express.json()) // Middleware pour parser le JSON
app.use(cookieParser()) //Middleware pour parser les cookies


//  Bloque la connexion en test  sinon les tests échouent

if (process.env.NODE_ENV !== "test") {   
  const db = DB.connect();
}



// Import des routes

const userRoutes = require("./routes/users/roles");
const authRoutes = require("./routes/auth")
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions)); 
app.use("/roles", userRoutes);
app.use("/auth", authRoutes)


app.get("/", (req, res) => {
  res.status(200).send({ message: "API Hackathon 2025 is running", status: "200" });
}); 

module.exports = app;

