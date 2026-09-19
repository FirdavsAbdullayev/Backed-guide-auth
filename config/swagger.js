const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Musobaqa Portali API",
      version: '1.0.0',
      description: "PostgreSQL, Sequelize, Joi va JWT bilan ishlaydigan Musobaqa Portali backend API hujjatlari"
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Lokal server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js'] // OpenAPI izohlari qayerdan izlanishi
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;   