const path = require('path')
const { colorTip } = require('./util')
const themes = require('./themes')
const isImageUrl = require('is-image-url')

const supportLanguage = ['en', 'zh']
const defaultLanguage = 'en'
const defaultTheme = 'theme1'
const defaultContent =
  'Generate personalized photos {easily}! Create your own unique style in just a few steps. Add {avatar}, {description}, {date}, {author} and {QR code} to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and {let your photos tell a story}!  #frontenddevelopment #personalizedphoto #creativetools'
const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = 'https://show.newarray.vip/hacker.png'
const defaultAuthor = 'AnyPhoto'
const defaultOutputDirPath = 'anyphoto'
const defaultOutputName = 'anyphoto'

const optionsCpu = {
  language: {
    validate(language) {
      return supportLanguage.includes(language) ? language : defaultLanguage
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
      // TODO translate and reset defaultAvatar
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

const themeDefaultLanguage = language => {
  return language || defaultLanguage
}
const themeDefaultContent = content => {
  return content || defaultContent
}
const themeDefaultAvatar = avatar => {
  return avatar || defaultAvatar
}
const themeDefaultAuthor = author => {
  return author || defaultAuthor
}
const themeDefaultOutputName = outputName => {
  return outputName || defaultOutputName
}

module.exports = {
  supportLanguage,
  defaultLanguage,
  defaultTheme,
  defaultContent,
  defaultConfigName,
  defaultAvatar,
  defaultAuthor,
  defaultOutputDirPath,
  defaultOutputName,
  optionsCpu,
  initConfig: theme => {
    return `const anyPhotoConfig = {
  defaultLanguage: '${themeDefaultLanguage(themes[theme].language)}',
  defaultContent: '${themeDefaultContent(themes[theme].content)}',
  defaultOutputDirPath: '${defaultOutputDirPath}',
  defaultOutputName: '${themeDefaultOutputName(themes[theme].outputName)}',
  defaultOutputNameHandle(defaultOutputName) {},
  defaultAvatar: '${themeDefaultAvatar(themes[theme].avatar)}',
  defaultAuthor: '${themeDefaultAuthor(themes[theme].author)}',
  canvasSetting: ${JSON.stringify(themes[theme].canvasSetting, null, 4)}
}
module.exports = anyPhotoConfig
`
  }
}
