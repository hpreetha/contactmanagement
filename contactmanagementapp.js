// contactmanagementapp.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

const port = 4444;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});