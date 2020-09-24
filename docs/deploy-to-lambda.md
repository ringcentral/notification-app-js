# Building and Deploying to AWS Lambda

AWS Lambda with API Gateway and RDS would give us a flexible way to deploy the bot. Follow these steps to deploy bot app in `example-deploy` to lambda.

Get an AWS account, create `aws_access_key_id` and `aws_secret_access_key` and place them in `~/.aws/credentials`, like this:

```bash
[default]
aws_access_key_id = <your aws_access_key_id>
aws_secret_access_key = <your aws_secret_access_key>
```

For more information, refer to [https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)

```bash
# create config files from sample
cp deploy/serverless.sample.yml deploy/serverless.yml
cp deploy/env.sample.yml deploy/env.yml
```

## AWS Lambda connects AWS RDS issue

For a simple server, you may not need a database, you can ignore this section.

- If you create an RDS manually and let it create a new security group for you.
- By default, the security group only allows inbound traffic from your current laptop's public IP address
AWS Lambda by default cannot access the newly created AWS RDS
- We need to update security group to allow inbound traffic from 0.0.0.0/0

Edit `deploy/serverless.yml` and `deploy/env.yml`, and make sure you set the proper name and required env.

Deploy to AWS Lambda with `npm run deploy`(requires run this in linux os)

```bash
# Run this cmd to deploy to AWS Lambda, full build, may take more time
npm run deploy

# When done deploying, do not forget change the webhook url in RingCentral Engage Digital -> admin -> Webhooks to https://xxxxxx.execute-api.us-east-1.amazonaws.com/prod/rc/webhook

## watch Lambda server log
npm run watch

```
