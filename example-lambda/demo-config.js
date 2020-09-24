/**
 * The most simple Glip integration
 * Do not use it in production, demo only
 * demo integration that send time stamp every one minute
 */

const axios = require('axios')

async function sendMsg (req, res) {
  const {
    msg
  } = req.query
  const r = await axios.post(process.env.STATIC_WEBHOOK, {
    text: 'Now',
    body: msg
  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  res.send(r.data)
}

// extends or override express app as you need
exports.appExtend = (app) => {
  app.get('/send-msg', sendMsg)
}
