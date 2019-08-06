var contactModel = require("../models/contact.model");
var contactController = ContactController.prototype;

// Constructor
function ContactController() {}

//Method for getting  all contact using mongoose method
contactController.getAllContacts = function(callback) {
  contactModel.find({}, function(err, res) {
    if (err) {
      callback(err);
    }
    callback(null, res);
  });
};

//Method for getting a contact using mongoose method

contactController.getOneContact = function(params, callback) {
  contactModel.findOne({ name: params }, function(err, res) {
    if (err) {
      callback(err);
    }
    callback(null, res);
  });
};

//Method for creating a contact using mongoose method
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

//Method for updating a contact using mongoose method
contactController.updateContact = function(name, request, callback) {
  contactModel.findOne({ name: name }, function(err, contact) {
    if (err) {
      callback(err);
    }
    if (!contact) {
      callback(new Error("Contact Not Found"));
    }
    contactModel.findOneAndUpdate({ name: name }, request, callback);
  });
};

//Method for deleting a contact using mongoose method

contactController.deleteContact = function(name, callback) {
  contactModel.findOne({ name: name }, function(err, contact) {
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
