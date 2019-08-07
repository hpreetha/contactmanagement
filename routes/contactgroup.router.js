const express = require("express");
const router = express.Router();

// Require the controllers to perform the dao logic
const ContactGroupController = require("../controllers/contactgroup.controller");
const contactGroupController = new ContactGroupController();

//Require the helper methods to construct the response and validates the input
const responseBuilder = require("../helpers/response.builder");
const validator = require("../helpers/request.validator");

// Routing to corresponding method for getting all contact using controller, when we receive GET operation
router.get("/", function(req, res) {
  contactGroupController.getAllContactGroups(function(err, response) {
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
      jsonResponse.contactGroups = response;
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
    contactGroupController.getOneContactGroup(params, function(err, response) {
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
        jsonResponse.contactGroup = response;
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
  if (!validator.createContactGroupValidator(jsonRequest)) {
    //Construct the error response for Mandatory param missing
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactGroupController.createContactGroup(jsonRequest, function(err, response) {
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
    contactGroupController.updateContactGroup(params, jsonRequest, function(
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
    contactGroupController.deleteContactGroup(params, function(err, response) {
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
