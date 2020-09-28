/**
 * The most simple Glip integration
 * Do not use it in production, demo only
 * demo integration that send time stamp every one minute
 */

const axios = require('axios')
const { CronJob } = require('cron')

// send time stamp every one minute
function runCron () {
  const rule = '* * * * *'
  console.log('Running cron job', rule)
  return new CronJob(rule, function () {
    const time = new Date().toString()
    axios.get(
      `${process.env.RINGCENTRAL_APP_SERVER}/send-msg?msg=${time}`
    )
      .then((res) => {
        console.log('msg request send:', time)
        console.log('result:')
        console.log(res.data)
      })
  }, null, true, undefined, undefined, true)
}

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
  runCron()
  app.get('/send-msg', sendMsg)
}
