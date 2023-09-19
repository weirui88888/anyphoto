const { getUserAnyPhotoConfig, handelValidAnyPhotoConfig } = require('../util')
const { defaultAuthor, defaultTheme, defaultAvatar } = require('../config')
const userAnyPhotoConfig = getUserAnyPhotoConfig()

const getUserAnyPhotoConfigByKey = ({ defaultKey }) => {
  return userAnyPhotoConfig[defaultKey]
}

// NOTE:获取所有的用户配置，优先级命令行选项>用户配置选项>默认选项
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
    default:
      return ''
  }
}
const getAnyPhotoConfig = ({ options }) => {
  const theme = getAnyPhotoConfigByKey({ key: 'theme', options })
  const avatar = getAnyPhotoConfigByKey({ key: 'avatar', options })
  const author = getAnyPhotoConfigByKey({ key: 'author', options })

  return handelValidAnyPhotoConfig({
    theme,
    avatar,
    author
  })
}

const generate = ({ word, options }) => {
  const anyPhotoConfig = getAnyPhotoConfig({
    options
  })
  console.log(anyPhotoConfig)
  return 'generate'
}

module.exports = generate
