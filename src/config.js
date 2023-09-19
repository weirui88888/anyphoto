const defaultConfigName = 'anyphoto.config.js'
const defaultTheme = 'classic'
const defaultAvatar = 'https://m0-file2.bybutter.com/head-image/21e8a53c1e9d514eff1099f43465721b.jpg'
const defaultAuthor = 'AnyPhoto'

module.exports = {
  defaultConfigName,
  defaultTheme,
  defaultAvatar,
  defaultAuthor,
  locale: 'english',
  initConfig: () => {
    return `const anyPhotoConfig = {
  outDir: 'anyphoto',
  defaultTheme: '${defaultTheme}',
  defaultAvatar: '${defaultAvatar}',
  defaultAuthor: '${defaultAuthor}'
}
module.exports = anyPhotoConfig
`
  }
}
