
/**
 * standalone server file, no cli
 */

import { createApp } from 'glip-integration-js'

const path = './demo-config.js'
console.log('-> bot:', path)
const conf = require(path)
const app = createApp(conf)

export default app
