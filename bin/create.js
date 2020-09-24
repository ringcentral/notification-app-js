const prompts = require('prompts')
const { echo, mv, rm } = require('shelljs')
const { resolve } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const download = require('download')
const os = require('os')
const { log } = console
const tempDir = os.tmpdir()

const supportedLanguage = {
  js: {
    zip: 'https://github.com/ringcentral/glip-integration-template-js/archive/master.zip',
    folderName: 'glip-integration-template-js-master'
  }
}

const questions = [
  {
    name: 'name',
    type: 'text',
    message: 'Project name, how about: my-glip-app',
    validate: input => {
      if (!input) {
        return 'project name is required'
      } else if (input.length > 50) {
        return 'project name max length: 50'
      }
      return true
    }
  },
  {
    name: 'description',
    type: 'text',
    message: 'Project description',
    validate: input => {
      if (!input) {
        return 'project description is required'
      } else if (input.length > 1000) {
        return 'project description max length: 1000'
      }
      return true
    }
  },
  {
    name: 'version',
    type: 'text',
    message: 'Project version',
    initial: '0.0.1'
  },
  // {
  //   name: 'language',
  //   type: 'select',
  //   message: 'What programming language do you use? Currently only support js/python',
  //   initial: 0,
  //   choices: [
  //     { title: 'js', value: 'js' },
  //     { title: 'python', value: 'python' }
  //   ]
  // },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Can you confirm?',
    initial: true
  }
]

function verifyResult (res) {
  return Object.keys(res).length === questions.length
}

function fetchZip (url, folderPath) {
  log('fetching', url, '-->', tempDir)
  rm('-rf', folderPath, folderPath + '.zip')
  return download(url, tempDir, {
    extract: true
  })
    .then(() => true)
    .catch(e => {
      throw e
    })
}

async function editFiles (from, res) {
  // package.json
  let pkg = resolve(from, 'package.json')
  let pkgInfo = require(pkg)
  let pkgObj = {
    name: res.npmName,
    version: res.version,
    description: res.description,
    keywords: pkgInfo.keywords,
    scripts: pkgInfo.scripts,
    devDependencies: pkgInfo.devDependencies,
    dependencies: pkgInfo.dependencies
  }
  writeFileSync(
    pkg,
    JSON.stringify(pkgObj, null, 2)
  )

  // README
  let readme = resolve(from, 'README.md')
  let readmeStr = readFileSync(readme).toString()
  let arr = readmeStr.split('## Youtube video')
  let final = `
# ${res.name}

${res.description}

## Youtube video${arr[1]}
  `
  writeFileSync(readme, final)
}

module.exports = async function ask ({ path: targetPath, name, auto }) {
  questions[0].initial = name
  let res = auto
    ? {
      name,
      npmName: name.replace(/\s+/g, '-'),
      description: 'Glip integration powered by RingCentral Glip integration framework js',
      version: '0.0.1'
    }
    : await prompts(questions)
  if (!verifyResult(res)) {
    return process.exit(0)
  }
  delete res.confirm
  console.log(res)
  res.npmName = res.name.replace(/\s+/g, '-')
  echo('building')
  let language = 'js'
  let obj = supportedLanguage[language]
  let { zip, folderName } = obj
  let from = resolve(tempDir, folderName)
  await fetchZip(zip, from)
  await editFiles(from, res)
  mv(from, targetPath)
  echo(`Done! Now you can run "cd ${targetPath}" and follow ${targetPath}/README.md's instruction to dev/test/deploy the bot!`)
}
