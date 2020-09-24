/**
 * demo config
 */

/**
 * handle all request
 * @param {object} body, request body
 * @param {object} req, express request
 */
exports.onRequest = async (body, req) => {
  console.log('body:', body)
  const { action, params } = body
  console.log('param', params)
  let result
  // check https://github.com/ringcentral/engage-digital-source-sdk/wiki for more info
  switch (action) {
    case 'implementation.info':
      result = {
        objects:
        {
          messages: ['create', 'show', 'list'],
          private_messages: ['create', 'show', 'list'],
          threads: ['create', 'show', 'list']
        },
        options: []
      }
      break

    case 'threads.list':
    case 'private_messages.list':
    case 'messages.list':
      result = []
      break
    case 'threads.show':
    case 'private_messages.show':
    case 'messages.show':
      result = ''
      break
    default:
      result = {}
  }
  return result
}

// extends or override express app as you need
exports.appExtend = (app) => {
  // app.get('/some-route', (req, res) => res.end('some'))
}
