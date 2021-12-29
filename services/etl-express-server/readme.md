# etl-express-server
An express server for the extraction of logs via the Salesforce API.

## Start using Docker 
```bash
$ docker run -p 3000:3000 etl-express-server:latest
```

## Start Using node
To start the service:
```bash
$ cd services/etl-express-server  # navigate to the service folder
$ npm start                       # start the service
```

By default this will start with the following configuration:
- Port 3000


This will start the server with the command:
`npx nodemon -L ./bin/www`


## Continuous Integration
CI is done via GCP Cloud Build Pipeline, using the dockerfile found here:

`/services/etl-express-server/Dockerfile`

Due to the monorepo structure, there is a trigger on the following path:

`/services/etl-express-server/**` 

Which means that only changes to the etl-expresss-server will trigger a build here.