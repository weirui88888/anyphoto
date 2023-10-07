const path = require('path')
const { colorTip } = require('./util')
const themes = require('./themes')
const isImageUrl = require('is-image-url')

const supportLanguage = ['en', 'zh']
const defaultLanguage = 'en'
const defaultZhLanguage = 'zh'
const defaultTheme = 'theme1'
const defaultContent =
  'Generate personalized photos {easily}! Create your own unique style in just a few steps. Add {avatar}, {description}, {date}, {author} and {QR code} to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and {let your photos tell a story}!  #frontenddevelopment #personalizedphoto #creativetools'
const defaultZhContent =
  '黄山的景色秀丽神奇，尤其是那些怪石，{有趣极了}。就说“仙女弹琴”吧，那美丽的{仙女弹着琴}，悠扬的琴声在山间久久回荡，好像在让人们评赞她的琴声。瞧，那陡峭的山峰上有一只可爱的小狗，抬头望着月亮，好像是要到月亮上去看看吧，这就是有趣的“{天狗望月}”。黄山的奇石还有很多，像“狮子抢球”、“猴子观海”、“龟鱼对望”等，{千姿百态，惟妙惟肖}。'
const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = '/Users/weirui05/Desktop/WechatIMG38388.jpg'
const defaultZhAvatar = '/Users/weirui05/Desktop/WechatIMG396.jpg'
const defaultAuthor = 'AnyPhoto'
const defaultZhAuthor = '黄山'
const defaultOutputDirPath = 'anyphoto'
const defaultOutputName = 'anyphoto'
const defaultZhOutputName = '黄山'

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
  if (language === defaultZhLanguage) {
    return `'${defaultZhLanguage}'`
  }
  return `'${defaultLanguage}'`
}
const themeDefaultContent = language => {
  if (language === defaultZhLanguage) {
    return `'${defaultZhContent}'`
  }
  return `'${defaultContent}'`
}
const themeDefaultAvatar = language => {
  if (language === defaultZhLanguage) {
    return `'${defaultZhAvatar}'`
  }
  return `'${defaultAvatar}'`
}
const themeDefaultAuthor = language => {
  if (language === defaultZhLanguage) {
    return `'${defaultZhAuthor}'`
  }
  return `'${defaultAuthor}'`
}
const themeDefaultOutputName = language => {
  if (language === defaultZhLanguage) {
    return `'${defaultZhOutputName}'`
  }
  return `'${defaultOutputName}'`
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
  locale: 'english',
  initConfig: theme => {
    return `const anyPhotoConfig = {
  defaultLanguage: ${themeDefaultLanguage(themes[theme].language)},
  defaultContent: ${themeDefaultContent(themes[theme].language)},
  defaultOutputDirPath: '${defaultOutputDirPath}',
  defaultOutputName: ${themeDefaultOutputName(themes[theme].language)},
  defaultOutputNameHandle(defaultOutputName) {},
  defaultAvatar: ${themeDefaultAvatar(themes[theme].language)},
  defaultAuthor: ${themeDefaultAuthor(themes[theme].language)},
  canvasSetting: ${JSON.stringify(themes[theme].canvasConfig, null, 4)}
}
module.exports = anyPhotoConfig
`
  }
}
