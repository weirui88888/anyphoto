const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { defaultConfigName, initConfig } = require('../config')
const { generateOra, sleep } = require('../util')
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
      `${chalk.green(configPath)} file has been created and can be configured before executing the generate command`
    )
  }
  fs.writeFile(configPath, initConfig(), err => {
    if (err) {
      initOra.fail(err.message)
      throw err
    }
    initOra.succeed(
      `[ ${defaultConfigName} ] generated ${chalk.green('successful')}! \nnow you can ${chalk.green(
        'edit'
      )} it in ${chalk.green(configPath)} and then run ${chalk.green('anyphoto generate <word>')}`
    )
  })
  return 'init'
}

module.exports = init
