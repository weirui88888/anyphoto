const path = require('path')
const fs = require('fs')
const { defaultConfigName, initConfig } = require('../config')
const { generateOra, sleep, color } = require('../util')
// TODO 看看能不能引入什么包实现语言版本自然切换
const init = async ({ configDirname }) => {
  const configPath = path.join(configDirname, defaultConfigName)
  const initOra = generateOra({
    spinner: 'dots',
    text: `anyphoto configuration file is being generated...`
  })
  initOra.start()
  await sleep(1)
  if (fs.existsSync(configPath)) {
    return initOra.succeed(
      `${color(
        'configPath',
        'green'
      )} file has been created and can be configured before executing the generate command`
    )
  }
  fs.writeFile(configPath, initConfig(), err => {
    if (err) {
      initOra.fail(err.message)
      throw err
    }
    // anyphoto generate <word>
    initOra.succeed(
      `[ ${color(defaultConfigName, 'green')} ] generated ${color('successful', 'green')} ! \nnow you can ${color(
        'edit',
        'blue'
      )} it in ${color(configPath, 'green', 'underline')} and then run ${color(
        'anyphoto generate <word>',
        'blue',
        'italic'
      )}`
    )
  })
  return 'init'
}

module.exports = init
