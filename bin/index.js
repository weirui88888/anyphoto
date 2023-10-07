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
  .argument('[content]', 'Any content you like')
  .option('--language <language>', 'The Content language , support with en or zh', 'en')
  .option('--avatar <url>', 'The avatar address of the photo')
  .option('--author <name>', 'The author name of the photo')
  .option('--outputDirPath <output dirPath>', 'The place where the photo be generated')
  .option('--outputName <output name>', 'The name of the output photo')
  .action((content, options) => {
    const testContent0 =
      'For a moment the last sunshine fell with romantic affection upon her glowing face her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent1 =
      'For a moment the {last sunshine fell with} romantic affection upon her glowing face her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent12 =
      'For a moment the {last sunshine fell with} romantic {affection upon her glowing face} her voice compelled me forward breathlessly as I listened—then the glow faded, each light deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent123 =
      'For a moment the {last sunshine fell with} romantic {affection upon her glowing face} her voice compelled me forward breathlessly as I listened—then {the glow faded, each light} deserting her with lingering regret like children leaving a pleasant street at dusk.'
    const testContent1234 =
      'For a moment the {last sunshine fell with} romantic {affection upon her glowing face} her voice compelled me forward breathlessly as I listened—then {the glow faded, each light} deserting her with lingering regret like children leaving a {pleasant street} at dusk.'
    const longString =
      '   On a bright and sunny morning, {a gentle breeze caressed the garden} by the lakeside as a stunning woman strolled gracefully.              Her figure was tall and elegant, commanding attention with every step she took. Her radiant smile illuminated the surroundings, captivating the hearts of those who were fortunate enough to catch a glimpse of her.                                                                              Her lustrous, flowing hair cascaded down {her shoulders like a waterfall of dark chocolate}, effortlessly framing her exquisite face. Her eyes, like pools of shimmering sapphires, held a depth that seemed to reveal an entire universe of emotions. They sparkled with intelligence and curiosity, drawing others into her magnetic gaze.'

    const chContent =
      '黄山的景色秀丽神奇，尤其是那些怪石，{有趣极了}。就说“仙女弹琴”吧，那美丽的{仙女弹着琴}，悠扬的琴声在山间久久回荡，好像在让人们评赞她的琴声。瞧，那陡峭的山峰上有一只可爱的小狗，抬头望着月亮，好像是要到月亮上去看看吧，这就是有趣的“{天狗望月}”。黄山的奇石还有很多，像“狮子抢球” “猴子观海”“ 龟鱼对望”等，{千姿百态，惟妙惟肖}。'
    generate({
      content: chContent,
      options
    })
  })

program.parse()
