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
      url: `https://hackaton-backend-api.vercel.app`,
    },
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
    }
  ],
};

const swaggerUiOptions = {
    explorer: true,
    customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css'
}

const options = {
  swaggerDefinition,
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {swaggerSpec, swaggerUiOptions };
