const { colorTip } = require('./util')
const themes = require('./themes')
const isImageUrl = require('is-image-url')

const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = '/Users/weirui05/Desktop/WechatIMG38388.jpg'
const defaultAuthor = 'AnyPhoto'
const defaultOutput = 'anyphoto'

const optionsCpu = {
  author: {
    validate(author) {
      return author
    }
  },
  avatar: {
    validate(avatar) {
      const isValidAvatar = isImageUrl(avatar)
      !isValidAvatar && colorTip('Tips: 由于你提供的头像地址不是一个正确的图片地址，将会采用默认值', 'yellow')
      return isValidAvatar ? avatar : defaultAvatar
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
  defaultAvatar,
  defaultAuthor,
  defaultOutput,
  optionsCpu,
  locale: 'english',
  initConfig: theme => {
    return `const anyPhotoConfig = {
  defaultOutput: '${defaultOutput}',
  defaultAvatar: '${defaultAvatar}',
  defaultAuthor: '${defaultAuthor}',
  canvasSetting: ${JSON.stringify(themes[theme], null, 4)}
}
module.exports = anyPhotoConfig
`
  }
}
