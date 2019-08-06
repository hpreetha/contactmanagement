const express = require("express");
const router = express.Router();

// Require the controllers to perform the dao logic
const contactGroupController = require("../controllers/contactgroup.controller");

router.get("/", function(err, res) {
  //  contactController.getAllContacts().then(data => {
  //      return data;
  //  });
});
module.exports = router;
