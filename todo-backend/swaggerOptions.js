const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // OpenAPI version
    info: {
      title: 'Todo List API',  // API title
      version: '1.0.0',  // API version
      description: 'A simple API for managing todo tasks with Express and Sequelize.',
    },
  },
  apis: ['./routes/*.js'], // Path to your route files for Swagger to read
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;