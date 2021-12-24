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
      console.log("accessToken available, starting query");
      queryLogs();
      res.status('Query Completed');
    };
});

//TODO Query Related Logs
function queryLogs() {
  var records = [];
  conn.query("SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Issue__c, LoginBrowser__c, LoginDomain__c, LoginApplication__c FROM Log__c", function(err, result) {
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
