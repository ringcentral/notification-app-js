
// const axios = require('axios')
const { copyFileSync, readFileSync, writeFileSync } = require('fs')
const { exec } = require('child_process')
const yaml = require('js-yaml')
const { resolve } = require('path')
const cwd = resolve(__dirname, '../deploy')
const execAsync = (cmd, options = {
  cwd
}) => {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (code, stdout, stderr) => {
      if (stderr) {
        return reject(stderr)
      }
      resolve(stdout)
    })
  })
}

function readYml (path) {
  // Get document, or throw exception on error
  return yaml.safeLoad(
    readFileSync(path, 'utf8')
  )
}
const { log } = console

async function run () {
  log('start deploy')
  copyFileSync(
    resolve(__dirname, '../example-lambda/package.json'),
    resolve(__dirname, '../deploy/package.json')
  )
  const file = resolve(__dirname, '../deploy/env.yml')
  const yml = readYml(file)
  console.log(yml, 'yml')
  const url = yml.RINGCENTRAL_APP_SERVER
  // if (!url || !/^https:\/\/.+\.amazonaws\.com.+/.test(url)) {
  //   console.log('please set correct RINGCENTRAL_CHATBOT_SERVER in dist/.env.yml')
  //   process.exit(1)
  // }
  const cmd1 = 'npm i --production'
  log(`run cmd: ${cmd1}`)
  const res = await execAsync(cmd1).catch(log)
  console.log(res)
  const cmd2 = '../node_modules/.bin/sls deploy'
  log(`run cmd: ${cmd2}`)
  const res1 = await execAsync(cmd2).catch(log)
  console.log(res1)
  if (!res1) {
    return log('build fails')
  }
  const reg = /(https:\/\/.+\.amazonaws\.com).+\}/
  const arr = res1.match(reg)
  if (!arr || !arr[1]) {
    return log('build fails')
  }
  const urlReal = `${arr[1]}/prod`
  log(`RINGCENTRAL_APP_SERVER in api gate way: ${urlReal}`)
  if (urlReal !== url) {
    log('modify RINGCENTRAL_APP_SERVER in deploy/.env.yml')
    yml.RINGCENTRAL_APP_SERVER = urlReal
    const newYml = yaml.safeDump(yml)
    writeFileSync(file, newYml)
    run()
  } else {
    log('url matched, no need re-deploy')
    // let dbinitUrl = `${urlReal}/admin/setup-database`
    // log(`url matched, init database by "curl -X ${dbinitUrl}"`)
    // axios.put(
    //   `${urlReal}/admin/setup-database`,
    //   undefined,
    //   {
    //     auth: {
    //       username: yml.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
    //       password: yml.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD
    //     }
    //   }
    // )
  }
}

run()
