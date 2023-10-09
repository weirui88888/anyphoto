const path = require('path')
const themes = require('./themes')

const supportSeparator = ['space', 'empty']
const defaultSeparator = 'space'
const defaultTheme = 'default'
const defaultContent =
  'Generate personalized photos {easily}! Create your own unique style in just a few steps. Add {avatar}, {description}, {date}, {author} and {QR code} to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and {let your photos tell a story}!  #frontenddevelopment #personalizedphoto #creativetools'
const defaultConfigName = 'anyphoto.config.js'
// TODO 这里的默认头像应该需要设置为正确的logo，因为在用户设置错误时，会使用其
const defaultAvatar = 'https://anyphoto.newarray.vip/logos/logo1/logo.png'
const defaultCustomFont = 'https://show.newarray.vip/font/LXGWWenKai-Bold.ttf'
const defaultHeaderDescriptionPrefixIcon = 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f99e.png'
const defaultQrCodeSrc = 'https://anyphoto.newarray.vip/logos/logo1/logo_transparent.png'
const defaultAuthor = 'AnyPhoto'
const defaultOutputDir = 'anyphoto'
const defaultOutputName = 'anyphoto'

const optionsValidator = {
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
      return avatar
    }
  },
  outputDir: {
    validate(outputDir) {
      return path.isAbsolute(outputDir) ? outputDir : path.join(process.cwd(), outputDir)
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
  defaultCustomFont,
  defaultHeaderDescriptionPrefixIcon,
  defaultQrCodeSrc,
  defaultAuthor,
  defaultOutputDir,
  defaultOutputName,
  optionsValidator,
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
  defaultOutputDir: '${defaultOutputDir}',
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
