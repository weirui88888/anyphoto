const path = require('path')
const fs = require('fs')
const {
  defaultSeparator,
  defaultContent,
  defaultAuthor,
  defaultAvatar,
  defaultOutputDir,
  defaultOutputName,
  defaultConfigName,
  optionsValidator
} = require('../config')
const { defaultCanvasSetting } = require('../defaultCanvasSetting')
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
      [option]: optionsValidator[option].validate(options[option])
    }
  }, {})
}

// Get all user configurations, priority command line options > User configuration options > Default options
const getAnyPhotoConfigByKey = ({ key, options }) => {
  if (options[key]) return options[key]
  const defaultKey = `default${key.charAt(0).toUpperCase() + key.slice(1)}`
  const userConfigByKey = getUserAnyPhotoConfigByKey({ defaultKey })
  if (userConfigByKey) return userConfigByKey
  switch (defaultKey) {
    case 'defaultSeparator':
      return defaultSeparator
    case 'defaultAuthor':
      return defaultAuthor
    case 'defaultAvatar':
      return defaultAvatar
    case 'defaultOutputDir':
      return defaultOutputDir
    case 'defaultOutputName':
      return defaultOutputName
    default:
      return ''
  }
}
const getAnyPhotoConfig = ({ options }) => {
  const separator = getAnyPhotoConfigByKey({ key: 'separator', options })
  const avatar = getAnyPhotoConfigByKey({ key: 'avatar', options })
  const author = getAnyPhotoConfigByKey({ key: 'author', options })
  const outputDir = getAnyPhotoConfigByKey({ key: 'outputDir', options })
  const outputName = getAnyPhotoConfigByKey({ key: 'outputName', options })
  return {
    ...handelValidAnyPhotoConfig({
      separator,
      avatar,
      author,
      outputDir,
      outputName
    }),
    defaultOutputNameHandle: getUserAnyPhotoConfigByKey({ defaultKey: 'defaultOutputNameHandle' }),
    canvasSetting: getUserAnyPhotoConfigByKey({ defaultKey: 'canvasSetting' }) || defaultCanvasSetting
  }
}

const generate = ({ content, options, canvasSetting }) => {
  const anyPhotoConfig = getAnyPhotoConfig({
    options
  })
  anyPhotoConfig.canvasSetting = {
    ...anyPhotoConfig.canvasSetting,
    ...canvasSetting
  }
  const handleContent = content || getUserAnyPhotoConfigByKey({ defaultKey: 'defaultContent' }) || defaultContent
  return draw({ content: handleContent, anyPhotoConfig })
}

module.exports = generate
