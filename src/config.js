const path = require('path')
const themes = require('./themes')
const supportSeparator = ['space', 'empty']
const defaultSeparator = 'space'
const defaultTheme = 'default'
const defaultContent =
  'Anyphoto is a product that can be used to generate personalized images. You can easily create a stylish, personalized image in just a few simple steps. Supports adding avatar, title, image, description, date, title, annotation content, etc. to make your photos lively and interesting instantly. {What’s more interesting is that every element in the photo can be configured}, so you can design the layout exactly according to your own creativity and ideas. You can choose your preferred font, layout, color palette, and everything else. You can use the resulting images anywhere, such as on social media, on your resume, or simply to capture what‘s on your mind at the moment! It is worth mentioning that this tool is {inspired by WeChat reading}. It has a variety of ways to use it, from the core toolkit with npm to the API, and of course the intuitive visual interface. Everything is being continuously updated. {Finally, hope you like it.}'
const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
const defaultCustomFont = 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf'
const defaultHeaderDescriptionPrefixIcon = 'https://static.anyphoto.space/core/themes/default/rainbow.png'
const defaultQrCodeSrc = 'https://static.anyphoto.space/logos/logo2/logo_transparent.png'
const defaultAuthor = 'AnyPhoto'
const defaultOutputDir = 'anyphoto'
const defaultOutputName = 'anyphoto'
const defaultOutputNameHandle = () => {
  function generateDate() {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return year + '.' + month + '.' + day + '.' + hours + '.' + minutes + '.' + seconds
  }
  return `photo-generate-at-${generateDate()}`
}

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
  defaultOutputNameHandle,
  optionsValidator,
  initConfig: theme => {
    return `/*
Tips:
If you find it troublesome to set the colors of different modules
in anyPhotoConfig below, you can set it centrally in colorSetting.
Of course, you can define this variable name at will. The only
thing you need to make sure is that in anyPhotoConfig below, you
must set it correctly to use it. for example:

backgroundColor:'#82b484' ====> backgroundColor:colorSetting.backgroundColor

This is what I consider the design from the perspective of a developer.
If you feel that I am very considerate from the bottom of your heart, don’t forget to give me a github star🌟 ,haha~

🌟 Github Address: https://github.com/weirui88888/anyphoto

const colorSetting = {
  backgroundColor: '#82b484',
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
  defaultOutputNameHandle(defaultOutputName) {
    function generateDate() {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      return year + '.' + month + '.' + day + '.' + hours + '.' + minutes + '.' + seconds
    }
    return \`photo-generate-at-\${generateDate()}\`
  },
  defaultAvatar: '${themeDefaultAvatar(themes[theme].avatar)}',
  defaultAuthor: '${themeDefaultAuthor(themes[theme].author)}',
  canvasSetting: ${JSON.stringify(themes[theme].canvasSetting, null, 4)}
}
module.exports = anyPhotoConfig
`
  }
}
