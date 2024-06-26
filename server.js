const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var routes = require("./route/routes");
const cors = require("cors");

/*
// AWS
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  accessKeyId: "ASIA4MTWNJOVVFJNVQM7",
  secretAccessKey: "VlZ7xqlXWseX8Hl8+fCDvUnwMXW9TxF3hRGnHQah",
});
//
*/

// Configuración de CORS
app.use(
  cors({
    origin: "http://3.135.204.14:8080", // Permitir solicitudes desde Angular
  })
);

app.listen(9992, function check(err) {
  if (err) console.log("error");
  else console.log("InfoPilotService on port 9992");
});

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/infopilot", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado exitosamente a MongoDB");
  } catch (error) {
    console.log("Error al conectarse a MongoDB:", error);
  }
}

connectToDatabase();

app.use(express.json());
app.use(routes);
