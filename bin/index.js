#! /usr/bin/env node
/* eslint-disable no-unused-vars */
const { Command } = require('commander')
const pkg = require('../package.json')
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
    const testContent1 =
      'For a moment the {last sunshine fell with} romantic affection upon her glowing face her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent2 =
      'For a moment the {last sunshine fell with} romantic {affection upon her glowing face} her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent3 =
      'For a moment the {last sunshine fell with romantic affection upon her glowing face her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving} a pleasant street at dusk.'
    const testContent4 =
      'For a {moment} the last sunshine fell with romantic affection {upon} her glowing face her voice {compelled} me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like {children leaving} a pleasant street at dusk.'
    const testContent5 =
      '{For} a moment the last sunshine fell with romantic affection upon her {glowing} face her voice compelled me forward breathlessly as I {listened—then} the glow faded, each light deserting her with lingering {regret} like children leaving a pleasant street at dusk.'
    const testContent6 =
      'I made {an} {interesting} {open source technology} product {from} 0 to 1. Although I experienced many difficulties along the way, I am very {excited} and {happy} now.'
    const testContent7 =
      'For a {moment} the last sunshine {fell with romantic affection upon} her glowing face her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent8 =
      '{For} {a} {moment} {the} {last} {sunshine} {fell} {with} {romantic} {affection} {upon} {her} {glowing} {face} {her} {voice} {compelled} {me} {forward} {breathlessly} {as} {I} {listened—then} {the} {glow} {faded}, {each} {light} {deserting} {her} {with} {lingering} {regret} {like} {children} {leaving} {a} {pleasant} {street} {at} {dusk}.'
    generate({
      content: `${testContent7}`,
      options
    })
  })

program.parse()
