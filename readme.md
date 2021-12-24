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
