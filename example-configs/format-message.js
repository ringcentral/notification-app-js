/**
 * in this example
 * the app will format incoming message to Glip supported message, then send it to webhook url
 * you can check Glip supported message format in: https://developers.ringcentral.com/guide/team-messaging/manual/formatting
 */

const axios = require('axios')

/**
 * format incoming message to Glip supported message
 * @param {object} body incoming message body
 * {
 *   title: 'xxx',
 *   url: 'https://xxx.com',
 *   sender: {
 *      login: 'xx',
 *      html_url: 'https://xxx.com/xxx'
 *   }
 * }
 */
function formatMsg (body) {
  return {
    attachments: [
      {
        type: 'Card',
        color: '#00ff2a',
        title: body.title,
        fallback: body.title,
        title_link: body.url,
        text: body.url,
        fields: [
          {
            title: 'Sender',
            value: `[${body.sender.login}](${body.sender.html_url})`,
            style: 'long'
          }
        ]
      }
    ]
  }
}

/**
 * send message to Glip webhook
 * @param {object} msg
 */
async function sendMsgToGlipWebhook (msg) {
  const r = await axios.post(process.env.STATIC_WEBHOOK, msg, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return r.data
}

async function handler (req, res) {
  const msgFormatted = formatMsg(req.body)
  const result = await sendMsgToGlipWebhook(msgFormatted)
  res.send(result)
}

// extends or override express app as you need
exports.appExtend = (app) => {
  app.post('/accept-msg', handler)
}
