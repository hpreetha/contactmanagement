const express = require("express");
const router = express.Router();

// Require the controllers to perform the dao logic
const ContactController = require("../controllers/contact.controller");
const contactController = new ContactController();

//Require the helper methods to construct the response

const responseBuilder = require("../helpers/response.builder");
const validator = require("../helpers/request.validator");

router.get("/", function(req, res) {
  contactController.getAllContacts(function(err, response) {
    if (err) {
      const jsonResponse = responseBuilder.getResponseMetaData(
        "9999",
        err.message
      );
      res.status(500);
      res.json(jsonResponse);
    } else {
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

router.get("/:name", function(req, res) {
  const params = req.params.name;
  if (!params) {
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.getOneContact(params, function(err, response) {
      if (err) {
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
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

router.post("/", function(req, res) {
  const jsonRequest = req.body;
  console.log("jsonRequest", jsonRequest);
  if (!validator.createContactValidator(jsonRequest)) {
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.createContact(jsonRequest, function(err, response) {
      if (err) {
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
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

router.put("/:name", function(req, res) {
  const params = req.params.name;
  const jsonRequest = req.body;
  console.log("jsonRequest", jsonRequest, params);
  if (!params) {
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
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
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

router.delete("/:name", function(req, res) {
  const params = req.params.name;
  if (!params) {
    const jsonResponse = responseBuilder.getResponseMetaData(
      "1000",
      "MANDATORY PARAM MISSING"
    );
    res.status(500);
    res.json(jsonResponse);
  } else {
    contactController.deleteContact(params, function(err, response) {
      if (err) {
        const jsonResponse = responseBuilder.getResponseMetaData(
          "9999",
          err.message
        );
        res.status(500);
        res.json(jsonResponse);
      } else {
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
