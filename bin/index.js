#! /usr/bin/env node
/* eslint-disable no-unused-vars */
const { Command } = require('commander')
const pkg = require('../package.json')
const { init, generate, github } = require('../src/cmd')
const { showAnyPhotoFiglet } = require('../src/util')
const { defaultTheme } = require('../src/config')

const program = new Command()

program.name(pkg.name).description(pkg.description).version(pkg.version)

program
  .command('init')
  .argument('[configDirname]', 'The path to the configuration file, defaults to the current project root directory')
  .option('--theme <theme>', 'The theme of the photo you want to use', defaultTheme)
  .description('Initialize configuration file')
  .action((configDirname = process.cwd(), { theme }) => {
    showAnyPhotoFiglet()
    init({ configDirname, theme })
  })

program
  .command('generate')
  .description('Generate photo by inspiration')
  .argument('[content]', 'Any content you like')
  .option(
    '-s, --separator <separator>',
    'The Content separator,support with empty or space,If not specified, the default is to use space to split the content.'
  )
  .option('-av, --avatar <url>', 'The avatar address of the photo')
  .option('-au, --author <name>', 'The author name of the photo')
  .option('-o, --outputDirPath <output dirPath>', 'The place where the photo will be generated')
  .option('-n, --outputName <output name>', 'The name of the output photo')
  .action((content, options) => {
    generate({
      content,
      options
    })
  })

program.parse()
