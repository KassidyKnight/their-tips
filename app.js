const express = require("express");
const app = express();
const path = require("path");

const routes = require("./routes/index");

app.use("/", routes);
app.use(express.static("public"));
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "/routes"));

module.exports = app;
