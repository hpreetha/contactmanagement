var contactModel = require("../models/contact.model");
var contactController = ContactController.prototype;

// Constructor
function ContactController() {}

contactController.getAllContacts = function(callback) {
  contactModel.find({}, function(err, res) {
    console.log("contactModel===========err", err, res);
    if (err) {
      callback(err);
    }
    callback(null, res);
  });
};

contactController.getOneContact = function(params,callback) {
    contactModel.findOne({name : params}, function(err, res) {
      console.log("contactModel===========err", err, res);
      if (err) {
        callback(err);
      }
      callback(null, res);
    });
  };

contactController.createContact = function(request, callback) {
  var contact = new contactModel(request);
  contact
    .save()
    .then(contact => {
      callback(null, contact);
    })
    .catch(err => {
      callback(err);
    });
};

contactController.updateContact = function(name, request, callback) {
  contactModel.findOne({ name: name }, function(err, contact) {
    console.log("found contact========", err, contact);
    if (err) {
      callback(err);
    }
    if (!contact) {
      callback(new Error("Contact Not Found"));
    }
    contactModel.findOneAndUpdate({ name: name }, request, callback);
  });
};

contactController.deleteContact = function(name, callback) {
  contactModel.findOne({ name: name }, function(err, contact) {
    console.log("found contact========", err, contact);
    if (err) {
      callback(err);
    }
    if (!contact) {
      callback(new Error("Contact Not Found"));
    }
    contactModel.findOneAndDelete({ name: name }, callback);
  });
};

module.exports = ContactController;
