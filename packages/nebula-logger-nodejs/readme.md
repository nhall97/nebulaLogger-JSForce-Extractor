# Nebula Logger NodeJS
This exists to help provide reusable code for interacting with the Nebula Logger package.

## NPM Package:
https://www.npmjs.com/package/nebula-logger-nodejs

## Install
```$npm i nebula-logger-nodejs```

<hr>

## Continuous Integration
CI is done via GCP Cloud Build Pipeline, using the dockerfile found here:

`/packages/nebula-logger-nodejs/dockerfile`

Due to the monorepo structure, there is a trigger on the following path:

`/packages/nebula-logger-nodejs/**` 

Which means that only changes to the nebula-logger-nodejs package will trigger a build here.

<hr>

## Continuous Deployment
Added a new trigger on tag

### To release a new version of nebula-logger-nodejs
1/ upgrade package using npm version   
`npm version patch`   
2/ add a tag of the new version

Format:   
`git tag nebula-logger-nodejs-{Major.Minor.Patch}`

Example:   
`git tag nebula-logger-nodejs-0.0.8` 

will trigger add a tag, which will trigger a release build on GCP.