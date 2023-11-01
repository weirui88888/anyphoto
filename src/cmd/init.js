const path = require('path')
const fs = require('fs')
const themes = require('../themes')
const { defaultConfigName, initConfig, defaultTheme } = require('../config')
const { generateOra, sleep, color } = require('../util')
const init = async ({ configDirname, theme }) => {
  const configPath = path.join(configDirname, defaultConfigName)
  const userTheme = themes[theme] ? theme : defaultTheme
  const initOra = generateOra({
    spinner: 'dots',
    text: 'anyphoto configuration file is being generated...'
  })
  initOra.start()
  await sleep(1)
  // TODO This may need to be changed. The user may want to replace the existing configuration file by default instead of deleting it first and then configuring it. This can be specified through a parameter.
  if (fs.existsSync(configPath)) {
    return initOra.succeed(
      `${color(
        'configPath',
        'green'
      )} file has been created already! (If you want to generate other theme configuration files, please ${color(
        'delete',
        'red',
        'italic'
      )} the old one first) \nnow you can ${color('edit', 'blue')} it in ${color(
        configPath,
        'green',
        'underline'
      )} and then run ${color('anyphoto generate <word>', 'blue', 'italic')}`
    )
  }
  fs.writeFile(configPath, initConfig(userTheme), err => {
    if (err) {
      initOra.fail(err.message)
      throw err
    }
    initOra.succeed(
      `[ ${color(defaultConfigName, 'green')} ] generated ${color('successful', 'green')}! \nnow you can ${color(
        'edit',
        'blue'
      )} it in ${color(configPath, 'green', 'underline')} and then run ${color(
        'anyphoto generate <word>',
        'blue',
        'italic'
      )}`
    )
  })
}

module.exports = init
