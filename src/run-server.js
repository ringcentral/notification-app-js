
/**
 * run source server file with path supplied from command line
 */

import { createApp } from './index'

const {
  GLIP_INTEGRATION__EXPRESS_PORT: port,
  GLIP_INTEGRATION__EXPRESS_HOST: host
} = process.env

export default ({ path }) => {
  console.log('-> config:', path)
  const conf = require(path)
  const app = createApp(conf)
  app.listen(port, host, () => {
    console.log(`-> server running at: http://${host}:${port}`)
  })
}
