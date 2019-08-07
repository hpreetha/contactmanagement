const mongoose = require("mongoose");

function validatePhone(phoneNo) {
  return /^[0-9]{10}$/.test(phoneNo);
}
var phoneSchema = new mongoose.Schema({
  work: {
    type: Number,
    validate: [validatePhone, "Please fill a valid Phone number"]
  },
  personal: {
    type: Number,
    validate: [validatePhone, "Please fill a valid Phone number"]
  },
  others: [Number]
},{
    toObject:{
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    },
    toJSON:{
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    }
});
function validateEmail(email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
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
  others: [String]
},{
    toObject:{
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    },
    toJSON:{
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    }
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
},{
    toObject:{
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    },
    toJSON:{
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          }
    }
});

module.exports = mongoose.model("Contact", contactSchema);
