const { yellow } = require('./util')
const isImageUrl = require('is-image-url')

const defaultConfigName = 'anyphoto.config.js'
const defaultTheme = 'classic'
const defaultAvatar = 'https://m0-file2.bybutter.com/head-image/21e8a53c1e9d514eff1099f43465721b.jpg'
const defaultAuthor = 'AnyPhoto'
const defaultOutput = 'anyphoto'
const validTheme = ['classic', 'fashion']

const optionsCpu = {
  author: {
    validate(author) {
      return author
    }
  },
  avatar: {
    validate(avatar) {
      const isValidAvatar = isImageUrl(avatar)
      !isValidAvatar && yellow('Tips: 由于你提供的头像地址不是一个正确的图片地址，将会采用默认值')
      return isValidAvatar ? avatar : defaultAvatar
    }
  },
  theme: {
    validate(theme) {
      const isValidTheme = validTheme.includes(theme)
      !isValidTheme && yellow('Tips: 目前仅支持经典和流行两种主题，由于你提供的主题不是一个正确的预设，将会采用默认值')
      return isValidTheme ? theme : validTheme[0]
    }
  },
  output: {
    validate(output) {
      // TODO:这里应该允许用户直接指定在某个地方生成图片
      // 比如 /Users/weirui05/Desktop 或者 /Users/weirui05/Desktop/my.jpg
      return output
    }
  }
}

module.exports = {
  defaultConfigName,
  defaultTheme,
  defaultAvatar,
  defaultAuthor,
  defaultOutput,
  optionsCpu,
  validTheme,
  locale: 'english',
  initConfig: () => {
    return `const anyPhotoConfig = {
  defaultOutput: '${defaultOutput}',
  defaultTheme: '${defaultTheme}',
  defaultAvatar: '${defaultAvatar}',
  defaultAuthor: '${defaultAuthor}'
}
module.exports = anyPhotoConfig
`
  }
}
