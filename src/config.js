const path = require('path')
const { colorTip } = require('./util')
const themes = require('./themes')
const isImageUrl = require('is-image-url')

const defaultLanguage = 'en'
const defaultContent =
  'Generate personalized photos easily! Create your own unique style in just a few steps. Add avatar, date, author and QR code to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and let your photos tell a story!  #frontenddevelopment #personalizedphoto #creativetools'
const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = '/Users/weirui05/Desktop/WechatIMG38388.jpg'
const defaultAuthor = 'AnyPhoto'
const defaultOutputDirPath = 'anyphoto'
const defaultOutputName = 'anyphoto'

const optionsCpu = {
  language: {
    validate(language) {
      return ['en', 'zh'].includes(language) ? language : 'en'
    }
  },
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
  outputDirPath: {
    validate(outputDirPath) {
      return path.isAbsolute(outputDirPath) ? outputDirPath : path.join(process.cwd(), outputDirPath)
    }
  },
  outputName: {
    validate(outputName) {
      return outputName
    }
  }
}

module.exports = {
  defaultLanguage,
  defaultContent,
  defaultConfigName,
  defaultAvatar,
  defaultAuthor,
  defaultOutputDirPath,
  defaultOutputName,
  optionsCpu,
  locale: 'english',
  initConfig: theme => {
    return `const anyPhotoConfig = {
  defaultLanguage:'${defaultLanguage}',
  defaultContent:'${defaultContent}',
  defaultOutputDirPath: '${defaultOutputDirPath}',
  defaultOutputName: '${defaultOutputName}',
  defaultOutputNameHandle(defaultOutputName) {},
  defaultAvatar: '${defaultAvatar}',
  defaultAuthor: '${defaultAuthor}',
  canvasSetting: ${JSON.stringify(themes[theme], null, 4)}
}
module.exports = anyPhotoConfig
`
  }
}
