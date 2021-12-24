# NebulaLogger NodeJS ETL
NodeJS server that can do:
- Extract records from [NebulaLogger](https://github.com/jongpie/NebulaLogger) (Salesforce Package)
- Transform Logs
- Send to a destination (TBC) - InfluxDB / Grafana?

## Configuration
### .env
```
SF_LOGIN_URL=https://login.salesforce.com
SF_USERNAME=demo.user@test.com
SF_PASSWORD=
SF_SECURITY_TOKEN=
```


## Under the hood
|Package|Information|Link|
|-|-|-|
|NebulaLogger| Package for better Salesforce Logging|https://github.com/jongpie/NebulaLogger|
|JSForce|Javascript package for Salesforce|https://jsforce.github.io|


### Example 'Records' response from Salesforce
```
  records: [
    {
      attributes: [Object],
      Id: 'a078d000000oV5HAAU',
      OwnerId: '0058d0000019D40AAE',
      IsDeleted: false,
      Name: 'Log-000000',
      CreatedDate: '2021-12-24T14:42:00.000+0000',
      CreatedById: '0058d000001bDXhAAM',
      LastModifiedDate: '2021-12-24T14:42:02.000+0000',
      LastModifiedById: '0058d000001bDXhAAM',
      SystemModstamp: '2021-12-24T14:42:02.000+0000',
      Issue__c: null,
      LoginBrowser__c: 'Firefox 95',
      LoginDomain__c: null,
      LoginApplication__c: 'Browser'
    },
    {
      attributes: [Object],
      Id: 'a078d000000oV5IAAU',
      OwnerId: '0058d0000019D40AAE',
      IsDeleted: false,
      Name: 'Log-000001',
      CreatedDate: '2021-12-24T14:42:43.000+0000',
      CreatedById: '0058d000001bDXhAAM',
      LastModifiedDate: '2021-12-24T14:42:43.000+0000',
      LastModifiedById: '0058d000001bDXhAAM',
      SystemModstamp: '2021-12-24T14:42:43.000+0000',
      Issue__c: null,
      LoginBrowser__c: 'Firefox 95',
      LoginDomain__c: null,
      LoginApplication__c: 'Browser'
    }
  ]
}

```
