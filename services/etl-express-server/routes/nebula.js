require("dotenv").config();
var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var nebula = require('nebula-logger-nodejs');

router.get('/', function(req, res, next) {
  console.log('Nebula Routing Module!')
  res.send('Nebula Routing Module!');
});



module.exports = router;