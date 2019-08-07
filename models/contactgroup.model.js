const mongoose = require("mongoose");
var Contact = require("./contact.model");

var contactGroupSchema = mongoose.Schema({
  name: String,
  contacts: [Contact.schema]
});

module.exports = mongoose.model("contactgroup", contactGroupSchema);
