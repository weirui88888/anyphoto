const path = require('path')
const { colorTip } = require('./util')
const themes = require('./themes')
const isImageUrl = require('is-image-url')

const supportSeparator = ['space', 'empty']
const defaultSeparator = 'space'
const defaultTheme = 'default'
const defaultContent =
  'Generate personalized photos {easily}! Create your own unique style in just a few steps. Add {avatar}, {description}, {date}, {author} and {QR code} to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and {let your photos tell a story}!  #frontenddevelopment #personalizedphoto #creativetools'
const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = 'https://show.newarray.vip/hacker.png'
const defaultAuthor = 'AnyPhoto'
const defaultOutputDirPath = 'anyphoto'
const defaultOutputName = 'anyphoto'

const optionsCpu = {
  separator: {
    validate(separator) {
      return supportSeparator.includes(separator) ? separator : defaultSeparator
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

const themeDefaultSeparator = separator => {
  return separator || defaultSeparator
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
  supportSeparator,
  defaultSeparator,
  defaultTheme,
  defaultContent,
  defaultConfigName,
  defaultAvatar,
  defaultAuthor,
  defaultOutputDirPath,
  defaultOutputName,
  optionsCpu,
  initConfig: theme => {
    return `/*
Tips:
If you find it troublesome to set the colors of different modules
in anyPhotoConfig below, you can set it centrally in colorSetting.
Of course, you can define this variable name at will. The only
thing you need to make sure is that in anyPhotoConfig below, you
must set it correctly to use it. for example:

backgroundColor:'#006666' ====> backgroundColor:colorSetting.backgroundColor

This is what I consider the design from the perspective of a developer.
If you feel that I am very considerate from the bottom of your heart, don’t forget to give me a github star🌟 ,haha~

🌟 Github Address: https://github.com/weirui88888/anyphoto

const colorSetting = {
  backgroundColor: '#006666',
  color: '',
  headerAvatarBorderColor: '',
  headerAuthorFontColor: '',
  headerDescriptionFontColor: '',
  headerDividerColor: '',
  footerDividerColor: '',
  sloganFontColor: '',
  fromFontColor: ''
}
*/

const anyPhotoConfig = {
  defaultSeparator: '${themeDefaultSeparator(themes[theme].separator)}',
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
