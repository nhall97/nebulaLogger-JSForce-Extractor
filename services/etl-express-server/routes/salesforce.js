require("dotenv").config();
var express = require('express');
var router = express.Router();
var jsforce = require('jsforce');
var nebula = require('nebula-logger-nodejs');

var conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL
});

router.get('/', function(req, res, next) {
  console.log('Salesforce Routing Module!')
  res.send('Salesforce Routing Module!' + nebula.helloWorld());

});

// Login to Salesforce
router.get('/login', function(req, res, next) {  
  var username = process.env.SF_USERNAME;
  var password = process.env.SF_PASSWORD;
  var security_token = process.env.SF_SECURITY_TOKEN;

  conn.login(username, password + security_token, function(err, userInfo) {
    if (err) { return console.error(err); }
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
});
  
  
  res.send('Salesforce: Login');
});

router.get('/logout', function(req, res, next) {
  conn.accessToken = null;
  conn.refreshToken = null;
  console.log('Logout succesful')
  res.send('Logout Successful!')
});

// Query Log Table
router.get('/logs', function(req, res, next) {
    if(conn.accessToken == null){
      console.log('No access token available! Need to refresh');

      refreshPromise = refreshLoginPromise();

      refreshPromise.then(
        (result) => {
          console.log("Refreshed the login!");
          queryLogs();
          res.send('Login Refreshed & Query Completed');
        },
        (error) => {
          console.error("Failed to refresh the login!");
          console.error(error.stack);
          return next(error);
        })
    } else {
      console.log("already logged in (accessToken available), ready to do operation");
      queryLogs();
      res.status('Query Completed');
    };
});

function queryLogs() {
  conn.query(nebula.log(), function(err, result) {
    if (err) { return console.error(err); }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
    console.log("done? : " + result.done);
    if (!result.done) {
      // you can use the locator to fetch next records set.
      // Connection#queryMore()
      console.log("next records URL : " + result.nextRecordsUrl);
    }

    result.records.forEach(record => {
      console.log(record.CreatedDate + ' | ' + record.Name);
    });

  });
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
