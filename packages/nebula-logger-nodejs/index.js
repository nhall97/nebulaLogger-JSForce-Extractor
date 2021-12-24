exports.printMsg = function() {
    console.log("This is a message from the demo package");
  }

// exports.log__c = function() {
//     return 'SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Issue__c, LoginBrowser__c, LoginDomain__c, LoginApplication__c FROM Log__c';
// }

const log = () => {
    return 'SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Issue__c, LoginBrowser__c, LoginDomain__c, LoginApplication__c FROM Log__c';
  };

  exports.log = log;
  