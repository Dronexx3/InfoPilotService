const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');

app.use(cors(
  {
    origin: "http://localhost:4200"
  }
));

app.listen(9992,function check(err)
{
    if(err)
    console.log("error")
    else
    console.log("started")
});

async function connectToDatabase() {
  try {
      await mongoose.connect("mongodb://localhost:27017/infopilot", {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log("Successfully connected to DB");
  } catch (error) {
      console.log("Error connecting to DB:", error);
  }
}

connectToDatabase();

app.use(express.json());
app.use(routes);
