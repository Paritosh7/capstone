var path = require("path");
const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");
const apiCalls = require("./apiCalls");

const app = express();

/* Middleware*/
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile("/client/views/index.html", { root: __dirname + "/.." });
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/get", async (req, res) => {
  const destination = req.query.destination;
  const date = req.query.date;
  console.log(destination);
  console.log(date);
  try {
    const jsonResponse = await apiCalls.fetchResponse(destination, date);
    res.json(jsonResponse);
  } catch (err) {
    res.json({ err: err.message });
  }
});
