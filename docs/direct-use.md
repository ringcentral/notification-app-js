# Direct use, no CLI

You can certainly use it as a module instead of a CLI tool.

Check [src/run-server.js](../src/run-server.js)

## For nodejs server

```js
import { createApp } from 'glip-integration-js'

const conf = require('path/to/config.js')
const app = createApp(conf)
app.listen(GLIP_INTEGRATION__EXPRESS_PORT, GLIP_INTEGRATION__EXPRESS_HOST, () => {
  console.log(`-> server running at: http://${GLIP_INTEGRATION__EXPRESS_HOST}:${GLIP_INTEGRATION__EXPRESS_PORT}`)
})
```

## For AWS Lambda

```js
import { createApp } from 'glip-integration-js'

const path = './auto-reply-all.js'
console.log('-> bot:', path)
const conf = require(path)
const app = createApp(conf)

export default app

```
