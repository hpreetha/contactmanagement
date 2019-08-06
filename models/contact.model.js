const mongoose = require("mongoose");

var phoneSchema = new mongoose.Schema({
  work: {
    type: Number,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: "{VALUE} is not a valid phone number!"
    }
  },
  personal: {
    type: Number,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: "{VALUE} is not a valid phone number!"
    }
  },
  others: [Number]
});
function validateEmail(email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
}

var emailSchema = new mongoose.Schema({
  work: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"]
  },
  personal: {
    type: String,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"]
  },
  Others: [String]
});

var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: phoneSchema
  },
  email: {
    type: emailSchema
  }
});
module.exports = mongoose.model("Contact", contactSchema);
