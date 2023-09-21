const path = require('path')
const fs = require('fs')
const {
  defaultAuthor,
  defaultTheme,
  defaultAvatar,
  defaultOutput,
  defaultConfigName,
  optionsCpu
} = require('../config')
const draw = require('../draw')

const getUserAnyPhotoConfigPath = directory => {
  const filePath = path.join(directory, defaultConfigName)
  if (fs.existsSync(filePath)) {
    return filePath
  }
  const parentDirectory = path.dirname(directory)
  if (parentDirectory === directory) {
    return
  }
  return getUserAnyPhotoConfigPath(parentDirectory)
}

const getUserAnyPhotoConfig = () => {
  const userAnyPhotoConfigPath = getUserAnyPhotoConfigPath(process.cwd())
  return userAnyPhotoConfigPath ? require(userAnyPhotoConfigPath) : {}
}

const userAnyPhotoConfig = getUserAnyPhotoConfig()

const getUserAnyPhotoConfigByKey = ({ defaultKey }) => {
  return userAnyPhotoConfig[defaultKey]
}

const handelValidAnyPhotoConfig = options => {
  return Object.keys(options).reduce((config, option) => {
    return {
      ...config,
      [option]: optionsCpu[option]['validate'](options[option])
    }
  }, {})
}

// 获取所有的用户配置，优先级命令行选项>用户配置选项>默认选项
const getAnyPhotoConfigByKey = ({ key, options }) => {
  if (options[key]) return options[key]
  const defaultKey = `default${key.charAt(0).toUpperCase() + key.slice(1)}`
  const userConfigByKey = getUserAnyPhotoConfigByKey({ defaultKey })
  if (userConfigByKey) return userConfigByKey
  switch (defaultKey) {
    case 'defaultTheme':
      return defaultTheme
    case 'defaultAuthor':
      return defaultAuthor
    case 'defaultAvatar':
      return defaultAvatar
    case 'defaultOutput':
      return defaultOutput
    default:
      return ''
  }
}
const getAnyPhotoConfig = ({ options }) => {
  const theme = getAnyPhotoConfigByKey({ key: 'theme', options })
  const avatar = getAnyPhotoConfigByKey({ key: 'avatar', options })
  const author = getAnyPhotoConfigByKey({ key: 'author', options })
  const output = getAnyPhotoConfigByKey({ key: 'output', options })

  return handelValidAnyPhotoConfig({
    theme,
    avatar,
    author,
    output
  })
}

const generate = ({ content, options }) => {
  const anyPhotoConfig = getAnyPhotoConfig({
    options
  })
  draw({ content, anyPhotoConfig })
}

module.exports = generate
