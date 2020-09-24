#!/usr/bin/env node

const reef = require('./create')
const resolve = require('path').resolve
const program = require('commander')

program
  .version(require('../package.json').version)
  .description('Cli tool to create a RingCentral Glip integration project')
  .usage('[appName]')
  .option('-A, --no-promots', 'use default options without promots')
  .parse(process.argv)

let name = program.args.shift()
if (!name) {
  program.outputHelp()
} else {
  let path = resolve(name)
  reef({
    name,
    path,
    auto: program.rawArgs.includes('-A') || program.rawArgs.includes('--no-promots')
  })
}
