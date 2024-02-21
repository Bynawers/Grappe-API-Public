const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/doc.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};
