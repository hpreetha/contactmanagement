const express = require("express");
const router = express.Router();

// Require the controllers to perform the dao logic
const ContactController = require("../controllers/contact.controller");
const contactController = new ContactController();

//Require the helper methods to construct the response and validates the input
const responseBuilder = require("../helpers/response.builder");
const validator = require("../helpers/request.validator");

// Routing to corresponding method for getting all contact using controller, when we receive GET operation
router.get("/", function(req, res) {
  contactController.getAllContacts(function(err, response) {
    if (err) {
      //Construct the error response for any unknown error
      const jsonResponse = responseBuilder.getResponseMetaData(
        "9999",
        err.message
      );
      res.status(500);
      res.json(jsonResponse);
    } else {
      //Construct the success response
      const jsonResponse = responseBuilder.getResponseMetaData(
        "0000",
        "SUCCESS"
      );
      jsonResponse.contacts = response;
      res.status(200);
      res.json(jsonResponse);
    }
  });
});

// Routing to corresponding method for getting one particular contact using controller, when we receive GET operation
router.get("/:name", function(req, res) {
  const params = req.params.name;
  if (!params) {
    //Construct the error response for Mandatory param missing
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.getOneContact(params, function(err, response) {
      if (err) {
        //Construct the error response for any unknown error
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
        //Construct the success response
        const jsonResponse = responseBuilder.getResponseMetaData(
          "0000",
          "SUCCESS"
        );
        jsonResponse.contact = response;
        res.status(200);
        res.json(jsonResponse);
      }
    });
  }
});

// Routing to corresponding method for adding the contact using controller, when we receive POST operation
router.post("/", function(req, res) {
  const jsonRequest = req.body;
  console.log("jsonRequest", jsonRequest);
  if (!validator.createContactValidator(jsonRequest)) {
    //Construct the error response for Mandatory param missing
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.createContact(jsonRequest, function(err, response) {
      if (err) {
        //Construct the error response for any unknown error
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
        //Construct the success response
        const jsonResponse = responseBuilder.getResponseMetaData(
          "0000",
          "SUCCESS"
        );
        res.status(200);
        res.json(jsonResponse);
      }
    });
  }
});

// Routing to corresponding method in updating the data using  controller, when we receive PUT operation
router.put("/:name", function(req, res) {
  const params = req.params.name;
  const jsonRequest = req.body;
  console.log("jsonRequest", jsonRequest, params);
  if (!params) {
    //Construct the error response for Mandatory param missing
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.updateContact(params, jsonRequest, function(
      err,
      response
    ) {
      if (err) {
        //Construct the error response for any unknown error
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
        //Construct the success response
        const jsonResponse = responseBuilder.getResponseMetaData(
          "0000",
          "SUCCESS"
        );
        res.status(200);
        res.json(jsonResponse);
      }
    });
  }
});

// Routing to corresponding method in delete controller, when we receive delete operation
router.delete("/:name", function(req, res) {
  const params = req.params.name;
  if (!params) {
    //Construct the error response for Mandatory param missing
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.deleteContact(params, function(err, response) {
      if (err) {
        //Construct the error response for any unknown error
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
        //Construct the success response
        const jsonResponse = responseBuilder.getResponseMetaData(
          "0000",
          "SUCCESS"
        );
        res.status(200);
        res.json(jsonResponse);
      }
    });
  }
});
module.exports = router;
