# Write SDK source server config file

Check [example-configs/interval-send-time.js](../example-configs/interval-send-time.js) as example, it is just like write a express app.

```js
// check express doc for more: https://expressjs.com/
// extends or override express app as you need

/**
 * app is just an express app
 * /
exports.appExtend = (app) => {
  // app.get('/some-route', (req, res) => res.end('some'))
}
```
