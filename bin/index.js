#! /usr/bin/env node
/* eslint-disable no-unused-vars */
const { Command } = require('commander')
const open = require('open')
const path = require('path')
const pkg = require('../package.json')
const { init, generate, github } = require('../src/cmd')
const { showAnyPhotoFiglet, colorTip, color } = require('../src/util')
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
  .option('-o, --outputDir <output dir>', 'The place where the photo will be generated')
  .option('-n, --outputName <output name>', 'The name of the output photo')
  .action((content, options) => {
    generate({
      content,
      options
    })
  })

program
  .command('show')
  .description('Quickly help you open the demo image of the theme on the web page')
  .argument(
    '[theme]',
    'The theme you want to preview. If you do not provide this parameter, you will be shown the name of the theme currently provided.'
  )
  .action(theme => {
    const themesFilePath = path.join(__dirname, '../src/themes/index.js')
    const themes = require(themesFilePath)
    const supportThemes = Object.keys(themes)
    if (theme) {
      if (supportThemes.includes(theme)) {
        open(`https://github.com/weirui88888/anyphoto/blob/main/src/themes/${theme}/example.png`)
      } else {
        colorTip(
          `The theme parameters you provided [${color(
            theme,
            'red'
          )}] are not in the existing theme list. Currently supported themes are [${color(
            supportThemes.toString(),
            'green'
          )}],please retry`
        )
      }
    } else {
      for (const theme of supportThemes) {
        colorTip(
          `${color(theme, 'green', 'bold')} ${color('->', 'yellow')} ${color(
            `https://github.com/weirui88888/anyphoto/blob/main/src/themes/${theme}/example.png`,
            'underline',
            'green'
          )}`
        )
      }
    }
  })

program.parse()
