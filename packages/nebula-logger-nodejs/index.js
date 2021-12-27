// Test function
function helloWorld() {
    console.log("Hello World, this is your nebula-logger-nodejs package.");
}

//sReturn a string with all the querable fields on the Log__c object
const log = () => {
    return 'SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Issue__c, LoginBrowser__c, LoginDomain__c, LoginApplication__c FROM Log__c';
};
  

module.exports = {
  helloWorld,
  log,
}