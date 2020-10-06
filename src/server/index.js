var path = require("path");
const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");

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

app.get("/get/:text", async (req, res) => {
  const destination = req.params.text;
  console.log(destination);
  const api_url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=2&username=${process.env.GEONAMES_KEY}`;
  const fetchResponse = await fetch(api_url);
  const json = await fetchResponse.json();
  res.json(json);
});
