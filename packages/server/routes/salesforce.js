var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
require("dotenv").config();

var conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Salesforce Endpoint');
});

// Login to Salesforce via this endpoint //
router.get('/login', function(req, res, next) {  
  var username = process.env.SF_USERNAME;
  var password = process.env.SF_PASSWORD;
  var security_token = process.env.SF_SECURITY_TOKEN;

  conn.login(username, password + security_token, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
});
  
  
  res.send('Salesforce: Login');
});

module.exports = router;
