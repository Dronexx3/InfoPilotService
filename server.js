const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var routes = require("./route/routes");
const cors = require("cors");

// AWS

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  accessKeyId: "ACCESS_KEY_ID",
  secretAccessKey: "SECRET_ACCESS_KEY",
});
//

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.listen(9992, function check(err) {
  if (err) console.log("error");
  else console.log("started");
});

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/infopilot", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado exitosamente en MongoDB");
  } catch (error) {
    console.log("Error al conectarse a MongoDB:", error);
  }
}

connectToDatabase();

app.use(express.json());
app.use(routes);
