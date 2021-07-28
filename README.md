# notification-app-js

Js framework to create RingCentral notification messaging app.

## Prerequisites

- Download and install RingCentral app and login: https://www.ringcentral.com/apps/rc-app
- Nodejs 8.10+/npm, recommend using [nvm](https://github.com/creationix/nvm) to install nodejs/npm.
- If you want to create RingCentral Glip integration that can show in RingCentral Glip apps list, you need a RingCentral developer account that can create Glip integration: you need [sign up](https://developers.ringcentral.com/) and apply for the permission to create Glip integration.

## Quick start

Let's start a simple RingCentral Glip integration that post time to a Glip team you selected.

```bash
# get the code
git clone git@github.com:ringcentral/notification-app-js.git
cd notification-app-js

# install dependecies
npm i

# start proxy server, this will make your local bot server can be accessed by RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later
```

Goto RingCentral app's App list, select [Incoming WebHooks](https://www.ringcentral.com/apps/glip-webhooks) app, and choose a team, and copy the glip webhook url for later use, and confirm install.

```bash
# create env file
cp .env.sample .env
# then edit .env,
# set https://xxxx.ap.ngrok.io as RINGCENTRAL_APP_SERVER
# set glip webhook url copied as STATIC_WEBHOOK

# run local dev server
npm start
```

Then the team will get timestamp message every minute.

Check [example-configs/interval-send-time.js](example-configs/interval-send-time.js) to see the code, it is pretty simple.

## Adaptive cards support

```bash
npm run dev1
```

Check [example-configs/interval-send-time-with-adaptive-card.js](example-configs/interval-send-time-with-adaptive-card.js) to see the code

Check [https://adaptivecards.io/samples/](https://adaptivecards.io/samples/) for more examples(* some may not be implanted yet)

## What if need a config page with UI

In quick start section the app is quite simple, only send message to the webhook url, what if we need a third party service send message to the webhook url, for example, a github notification app would auto send github event to RingCentral chat group,

Check these this demo project, with step by step guide in readme:

https://github.com/ringcentral/github-notification-app-demo

Also check [ringcentral-notification-app with UI(authorization and else)](https://github.com/ringcentral/ringcentral-notification-demo-ui-app) and [ringcentral-notification-integration-helper](https://github.com/ringcentral/ringcentral-notification-integration-helper) which is used to communicate with RingCentral App.

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
