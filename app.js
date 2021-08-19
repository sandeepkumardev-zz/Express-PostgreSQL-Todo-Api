const HTTP = require("http");
const PORT = process.env.NODE_ENV || 3000;

const app = require("./src/middleware");
const { sequelize } = require("./database/models");

HTTP.createServer(app).listen(PORT, async () => {
  console.log("Server is runing!");
  await sequelize
    .authenticate({ logging: false })
    .then(() => console.log("Database connected!"))
    .catch(() => console.log("Database not connected!"));
});
