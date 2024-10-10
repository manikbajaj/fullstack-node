swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Cloudaffle Task Manager API",
      version: "0.1.0",
      //! SEE that adding description and contact has a direct impact on documentation website
      description:
        "API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Manik",
        url: "https://cloudaffle.com",
        email: "manik@cloudaffle.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: [path.join(__dirname, "..", "**/*.js")],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
