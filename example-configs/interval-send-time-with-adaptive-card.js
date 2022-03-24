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
const json = {
  attachments: [
    {
      type: 'AdaptiveCard',
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.3',
      fallbackText: 'https://adaptivecards.io/explorer/AdaptiveCard.html',
      body: [
        {
          type: 'Container',
          items: [
            {
              type: 'TextBlock',
              text: 'New comment on Issue #3',
              weight: 'Bolder',
              size: 'Medium'
            },
            {
              type: 'TextBlock',
              text: '"New test issue"',
              spacing: 'None'
            },
            {
              type: 'ColumnSet',
              columns: [
                {
                  type: 'Column',
                  width: 'auto',
                  items: [
                    {
                      type: 'Image',
                      url: 'https://avatars.githubusercontent.com/u/1641949?v=4',
                      size: 'Small',
                      style: 'Person'
                    }
                  ]
                },
                {
                  type: 'Column',
                  width: 'stretch',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'zxdong262',
                      weight: 'Bolder',
                      wrap: true
                    },
                    {
                      type: 'TextBlock',
                      spacing: 'None',
                      text: 'Created {{DATE(2021-01-28T09:28:00Z, SHORT)}}',
                      isSubtle: true,
                      wrap: true
                    }
                  ]
                },
                {
                  type: 'Column',
                  width: 'auto',
                  items: [
                    {
                      type: 'Image',
                      url: 'https://github.com/ringcentral/github-notification-app/blob/main/icons/comment.png?raw=true',
                      size: 'Small'
                    }
                  ]
                }
              ],
              separator: true
            }
          ]
        },
        {
          type: 'Container',
          items: [
            {
              type: 'RichTextBlock',
              inlines: [
                {
                  type: 'TextRun',
                  text: 'Comment:',
                  weight: 'Bolder'
                }
              ]
            },
            {
              type: 'RichTextBlock',
              inlines: [
                {
                  type: 'TextRun',
                  text: "Adding new documentation for new endpoint we are currently developing and continuing the conversation. Want to have a really long comment to see how comments are displayed on a card and rendered as a multi-line object that spans several sentences. Let's just talk a lot about nothing to have a really long comment."
                }
              ]
            },
            {
              type: 'FactSet',
              facts: [
                {
                  title: 'Repository:',
                  value: '[electerm/test-repo](https://github.com/electerm/test-repo)'
                },
                {
                  title: 'Issue:',
                  value: '#2'
                }
              ]
            }
          ]
        },
        {
          type: 'ActionSet',
          actions: [
            {
              type: 'Action.OpenUrl',
              title: 'View in GitHub',
              url: 'https://github.com/ringcentral/github-notification-app'
            }
          ]
        },
        {
          type: 'ColumnSet',
          columns: [
            {
              type: 'Column',
              width: 'auto',
              items: [
                {
                  type: 'Image',
                  url: 'https://github.com/ringcentral/github-notification-app/blob/main/icons/feedback-32.png?raw=true',
                  size: 'small',
                  style: 'person',
                  width: '16px'
                }
              ]
            },
            {
              type: 'Column',
              width: 'stretch',
              items: [
                {
                  type: 'TextBlock',
                  text: '[Feedback (Any suggestions, or issues about the github notification app?)](https://github.com/ringcentral/github-notification-app/issues/new)',
                  weight: 'lighter',
                  wrap: true,
                  size: 'small'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

async function sendMsg (req, res) {
  // const {
  //   msg
  // } = req.query
  const r = await axios.post(process.env.STATIC_WEBHOOK, json, {
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
