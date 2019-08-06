// contactmanagementapp.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// initialize our express app
const app = express();

const port = 4444;

mongoose
  .connect("mongodb://localhost:27017/contactmanagement", {
    useNewUrlParser: true
  })
  .catch(error => console.log(error));

mongoose.connection.on("error", err => {
  console.log(err);
});

app.use(function(err, req, res, next) {
  console.log("", service, "", "", "", "", err.stack, "");
  let jsonResponse = {};
  jsonResponse.statusCode = "9999";
  jsonResponse.statusDesc = err.message;
  res.status = 500;
  res.json(jsonResponse);
});
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

process.on("uncaughtException", function(err) {
  // Log the event for error
  console.log("uncaughtException------", err.stack);
});

/*
 * Router Mapping
 */
var contactRouter = require("./routes/contact.router");
var contactGroupRouter = require("./routes/contactgroup.router");

app.use("/contactmanagement/contact", contactRouter);
app.use("/contactmanagement/contactgroup", contactGroupRouter);

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
