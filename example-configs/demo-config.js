/**
 * demo config
 */

/**
 * handle request when install, check docs from https://expressjs.com/
 * @param {object} body, request body
 * @param {object} req, express request
 */
exports.onInstall = async (req, res) => {
  console.log('req', req.body, req.query)
  res.send('ok')
}

// extends or override express app as you need
exports.appExtend = (app) => {
  // app.get('/some-route', (req, res) => res.end('some'))
}
