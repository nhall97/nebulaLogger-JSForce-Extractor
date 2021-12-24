var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
require("dotenv").config();

var conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Salesforce Routing!')
  res.send('Salesforce Routing!');
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

// Query Log Table
router.get('/logs', function(req, res, next) {
  //I want to check if there is a login session available, if not, refresh login

  // const consumer = () => {
  //   promise.then(
  //     result => {

  //     },
  //     error => {
  //       console.log("CONSUMER ERROR");
  //     }),
  //   promise.catch(error => {
  //     console.log("CONSUMER CATCH");
  //     console.log(error);
  //   });
  // }

  var records = [];

    if(conn.accessToken == null){
      console.log('No access token available! Need to refresh');

      refreshPromise = refreshLoginPromise();

      refreshPromise.then(
        (result) => {
          console.log("Refreshed the login!");
          queryAccount();
          res.send('Login Refreshed & Query Completed');
        },
        (error) => {
          console.error("Failed to refresh the login!");
          console.error(error.stack);
          return next(error);
        })
    } else {
      console.log("accessToken available, starting query");
      queryAccount();
      res.status('Query Completed');
    };
    

});

function queryAccount() {
  conn.query("SELECT Id, Name FROM Account", function(err, result) {
    if (err) { 
      return console.error(err);
    }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
    return ("total : " + result.totalSize);
    })
}

function refreshLoginPromise() {
  var username = process.env.SF_USERNAME;
  var password = process.env.SF_PASSWORD;
  var security_token = process.env.SF_SECURITY_TOKEN;

  let promise = new Promise(function (resolve, reject) {
    conn.login(username, password + security_token, function(err, userInfo) {
      if (err) { reject(err); }
      else resolve();
    });
  });
  return promise;
}

module.exports = router;
