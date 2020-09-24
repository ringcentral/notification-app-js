# Step by step guide to enable SDK source

- RingCentral Engage(Dimelo) account, [request a demo](http://site.dimelo.com/en/demo#schedule-demo).
- Login to your RingCentral Engage(Dimelo) admin console.
- Create a sdk source community in RingCentral Engage Digital -> admin -> community.
- Create "Dimelo Source SDK" soruce in RingCentral Engage Digital -> admin -> Source, make sure it enabled and active, fill required fields, and you can get the API token, and Realtime endpoint URL here. `Base URI` should be your source server address, like `https://xxxx.ap.ngrok.io` when using ngrok, or some other address you use.
- After polling API retrive messages, if you want to reply message, make sure you have at least one user have `puppetizable: true` prop, check [https://github.com/ringcentral/engage-digital-source-sdk/wiki/Users](https://github.com/ringcentral/engage-digital-source-sdk/wiki/Users) for more info, and `actions: ['reply', 'show']` in every message you want to be replied, then you still need to goto Engage Digital Admin console => identities to set the user to be controlled, and add the agent identity for Admin console => agents for the agent you want to reply with.
