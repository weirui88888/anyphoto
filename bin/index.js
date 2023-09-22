#! /usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package.json')
const figlet = require('figlet')
const { tip } = require('../src/util')
const { init, generate, github, oss } = require('../src/cmd')
const { defaultTheme, defaultAuthor, defaultAvatar } = require('../src/config')

// console.log(figlet.textSync('Any Photo'))

const program = new Command()

program.name(pkg.name).description(pkg.description).version(pkg.version)

program
  .command('init')
  .argument('[configDirname]', 'The path to the configuration file, defaults to the current project root directory')
  .description('Initialize configuration file')
  .action((configDirname = process.cwd()) => {
    init({ configDirname })
  })

program
  .command('generate')
  .description('Generate photo by inspiration')
  .argument('<content>', 'Any content you like')
  .option('--theme <type>', 'The theme of the photo. Optional values include classic and fashion')
  .option('--avatar <url>', 'The avatar of the photo')
  .option('--author <name>', 'The author name of the photo')
  .option('--output <folder name>', 'The place where the photo be generated')
  .action((content, options, command) => {
    generate({
      content,
      options
    })
  })

program.parse()
