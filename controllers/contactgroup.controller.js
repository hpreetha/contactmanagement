var contactGroupModel = require("../models/contactgroup.model");
var contactModel = require("../models/contact.model");

var contactGroupController = ContactGroupController.prototype;

// Constructor
function ContactGroupController() {}

//Method for getting  all contact using mongoose method
contactGroupController.getAllContactGroups = function(callback) {
  contactGroupModel.find({}, function(err, res) {
    if (err) {
      callback(err);
    }
    callback(null, res);
  });
};

//Method for getting a contact using mongoose method

contactGroupController.getOneContactGroup = function(params, callback) {
  contactGroupModel.findOne({ name: params }, function(err, res) {
    if (err) {
      callback(err);
    }
    callback(null, res);
  });
};


//Method for creating a contact using mongoose method
contactGroupController.createContactGroup = function(request, callback) {
            var contactGroup = new contactGroupModel(request);
            contactGroup
              .save()
              .then(contactGroup => {
                callback(null, contactGroup);
              })
              .catch(err => {
                callback(err);
              });
            
};

//Method for updating a contact using mongoose method
contactGroupController.updateContactGroup = function(name, request, callback) {
  contactGroupModel.findOne({ name: name }, function(err, contactGroup) {
    if (err) {
      callback(err);
    }
    if (!contactGroup) {
      callback(new Error("Contact Group Not Found"));
    }
    contactGroupModel.findOneAndUpdate({ name: name }, request, callback);
  });
};

//Method for deleting a contact using mongoose method

contactGroupController.deleteContactGroup = function(name, callback) {
  contactGroupModel.findOne({ name: name }, function(err, contactGroup) {
    if (err) {
      callback(err);
    }
    if (!contactGroup) {
      callback(new Error("Contact Group Not Found"));
    }
    contactGroupModel.findOneAndDelete({ name: name }, callback);
  });
};

module.exports = ContactGroupController;
