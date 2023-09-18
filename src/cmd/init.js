const path = require('path')
const { defaultConfigName } = require('../util/config')

const init = ({ configDirname = process.cwd() }) => {
  const configPath = path.join(configDirname, defaultConfigName)
  console.log(configPath)
  return 'init'
}

module.exports = init
