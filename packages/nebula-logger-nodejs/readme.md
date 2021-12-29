# Nebula Logger NodeJS
This exists to help provide reusable code for interacting with the Nebula Logger package.

## NPM Package:
https://www.npmjs.com/package/nebula-logger-nodejs

## Install
```$npm i nebula-logger-nodejs```

## Continuous Integration
CI is done via GCP Cloud Build Pipeline, using the dockerfile found here:

`/packages/nebula-logger-nodejs/dockerfile`

Due to the monorepo structure, there is a trigger on the following path:

`/packages/nebula-logger-nodejs/**` 

Which means that only changes to the nebula-logger-nodejs package will trigger a build here.