const path = require('path')
const themes = require('./themes')
const supportSeparator = ['space', 'empty']
const defaultSeparator = 'empty'
const defaultTheme = 'default'
const defaultContent = `Anyphoto is a product that can be used to generate personalized images. You can easily create stylish, personalized images in just a few simple steps. Supports adding avatars, titles, pictures, descriptions, dates, titles, grid backgrounds, annotations, etc. to make your photos lively and interesting instantly.

{What’s more interesting is that every element in the photo is configurable}, so you can design the layout completely according to your creativity and ideas. You can choose your favorite fonts, layout, color palette and everything else.

You can use the generated images anywhere, such as on social media, resumes, journals, or just to capture your thoughts at the moment!`
const defaultConfigName = 'anyphoto.config.js'
const defaultAvatar = 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
const defaultBackgroundImage = 'https://static.anyphoto.space/examples/WechatIMG540.jpg'
const defaultCustomFont = 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf'
const defaultHeaderDescriptionPrefixIcon = 'https://static.anyphoto.space/core/themes/default/rainbow.png'
const defaultSloganIcon = 'https://static.anyphoto.space/web/logo/logo_transparent.png'
const defaultTitle = 'AnyPhoto'
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
  title: {
    validate(title) {
      return title
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

const themeDefaultContent = content => {
  return content || defaultContent
}
const themeDefaultAvatar = avatar => {
  return avatar || defaultAvatar
}
const themeDefaultTitle = title => {
  return title || defaultTitle
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
  defaultBackgroundImage,
  defaultCustomFont,
  defaultHeaderDescriptionPrefixIcon,
  defaultSloganIcon,
  defaultTitle,
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
  headerTitleFontColor: '',
  headerDescriptionFontColor: '',
  headerDividerColor: '',
  footerDividerColor: '',
  sloganFontColor: '',
  fromFontColor: ''
}
*/

const anyPhotoConfig = {
  defaultContent: \`${themeDefaultContent(themes[theme].content)}\`,
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
  defaultTitle: '${themeDefaultTitle(themes[theme].title)}',
  canvasSetting: ${JSON.stringify(themes[theme].canvasSetting, null, 4)}
}
module.exports = anyPhotoConfig
`
  }
}
