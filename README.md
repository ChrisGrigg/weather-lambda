# weather-lambda

To run this locally using the 'serverless-offline' package: 

'npm i && npm start'

To unit test: 'npm test'

Developed using node version 12.16.1 and npm version 6.14.4.

Address for this Lambda on AWS is 'https://mjlmap9ys3.execute-api.ap-southeast-2.amazonaws.com/development/weather/main?city=London'

TODO: with more time:

- make a centralised 'response' class that handles 200 or error response
- put API keys in AWS environment variables for security in case a hacker gets hold of source version control
- use 'serverless-bundle' with webpack so es2020 can be used
- make centralised error handling which sends all errors to error log in cloud which notifies the dev team (cloudwatch logs in AWS are hard to use)
- tighten up CORS so only the client can access this Lambda (config would be required for; local, dev, uat and prod environments)
- use typescript
- add security to the Lambda using JWT with AWS Cognito for management
