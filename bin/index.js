#! /usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package.json')
// eslint-disable-next-line no-unused-vars
const { init, generate, github } = require('../src/cmd')
const { showAnyPhotoFiglet } = require('../src/util')

const program = new Command()

program.name(pkg.name).description(pkg.description).version(pkg.version)

program
  .command('init')
  .argument('[configDirname]', 'The path to the configuration file, defaults to the current project root directory')
  .option('--theme <theme>', 'The theme of the photo you want to use', 'theme1')
  .description('Initialize configuration file')
  .action((configDirname = process.cwd(), { theme }) => {
    showAnyPhotoFiglet()
    init({ configDirname, theme })
  })

program
  .command('generate')
  .description('Generate photo by inspiration')
  .argument('<content>', 'Any content you like')
  .option('--avatar <url>', 'The avatar of the photo')
  .option('--author <name>', 'The author name of the photo')
  .option('--outputDirPath <output dirPath>', 'The place where the photo be generated')
  .option(
    '--outputName <output name>',
    'The name of the photo, which will be combined with the current time by default'
  )
  .action((content, options) => {
    generate({
      content,
      options
    })
  })

program.parse()
