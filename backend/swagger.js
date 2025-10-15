const swaggerJSDoc = require('swagger-jsdoc');
require("dotenv").config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Projet hackaton API ',
    version: '1.0.0',
    description: 'Documentation de l\'API pour le projet hackaton 2025',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
    },
    {
      url: `/`,
    }
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
