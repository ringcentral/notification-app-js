# JavaScript Notification Framework

Js framework to create RingCentral notification messaging app.

## Prerequisites

- Download and install RingCentral app and login: https://www.ringcentral.com/apps/rc-app
- Nodejs 8.10+/npm, recommend using [nvm](https://github.com/creationix/nvm) to install nodejs/npm.
- If you want to create RingCentral Team Messaging integration that can show in RingCentral Team Messaging apps list, you need a RingCentral developer account that can create Team Messaging integration: you need [sign up](https://developers.ringcentral.com/) and apply for the permission to create `Glip` integration.

## Quick Start Step 1 - Understanding Webhooks to Team Messaging

Let's start a simple RingCentral Team Messaging integration that posts the current time to a RingCentral team of your choice.

```bash
# get the code
git clone git@github.com:ringcentral/notification-app-js.git
cd notification-app-js

# install dependecies
npm i

# start proxy server, this will allow your local bot server to be accessed by the RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later
```

Goto RingCentral app's App list, select the [Incoming WebHooks](https://www.ringcentral.com/apps/glip-webhooks) app, choose a team, and copy the incoming webhook url for later use. Confirm installation.

```bash
# create env file
cp .env.sample .env
# then edit .env,
# set https://xxxx.ap.ngrok.io as RINGCENTRAL_APP_SERVER
# set incoming webhook url copied as STATIC_WEBHOOK

# run local dev server
npm start
```

The team will get a timestamp message every minute.

Check [example-configs/interval-send-time.js](example-configs/interval-send-time.js) to see the code, it is pretty simple.

## Quick Start Step 2 - Send Adaptive Cards to Team Messaging

Now that you know how to send messages to a team via incoming webhooks, let's send something a little more exciting.

```bash
npm run dev1
```

This will send an example adaptive card that looks like a GitHub notification. This card will send every 1 minute until you manually stop the running service.

Check [example-configs/interval-send-time-with-adaptive-card.js](example-configs/interval-send-time-with-adaptive-card.js) to see the code

Check [https://adaptivecards.io/samples/](https://adaptivecards.io/samples/) for more examples of adaptive cards (Note: some samples may not render yet as we continue to develop all adaptive card elements) or even use the [https://adaptivecards.io/designer/](https://adaptivecards.io/designer/) to create your own!

## Quick Start Step 3 - Create a Configuration Page

In the quick start step 1 section, the app is quite simple, it only sends a message to the webhook url. What if we have a third party service send a message to the webhook url? For example, a GitHub notification app could auto send GitHub events to RingCentral chat group,

Creating a configuration page to setup your webhook source is more involved.  Follow along in this demo project, with step by step guide in readme:

https://github.com/ringcentral/github-notification-app-demo

Additional guides:
[ringcentral-notification-app with UI(authorization and else)](https://github.com/ringcentral/ringcentral-notification-demo-ui-app)
[ringcentral-notification-integration-helper](https://github.com/ringcentral/ringcentral-notification-integration-helper) which is used to communicate with RingCentral App.

## Use it as CLI tool

```bash
npx glip-integration-js path-to-your-config.js
```

## Use it as a module

[docs/direct-use.md](docs/direct-use.md)

## Real example

- [ringcentral-notification-app with UI(authorization and else)](https://github.com/ringcentral/ringcentral-notification-demo-ui-app)

## Write a config

[docs/write-a-config.md](docs/write-a-config.md)

## Build and Deploy to AWS Lambda

[docs/deploy-to-lambda.md](docs/deploy-to-lambda.md)

## Init a source server project with factory CLI tool

We have built-in CLI command to init a empty project from template: [https://github.com/ringcentral/glip-integration-template-js](https://github.com/ringcentral/glip-integration-template-js).

```bash
npm i -g glip-integration-js
glip-integration-js-create my-app
```

## Links

- Format messages before send to glip webhook: https://developers.ringcentral.com/guide/team-messaging/manual/formatting

## License

MIT
