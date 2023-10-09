const path = require('path')
const fs = require('fs')
const axios = require('axios')
const isImageUrl = require('is-image-url')
const { checkRemoteFileExists, colorTip, color, tip } = require('./util')
const { defaultAvatar, defaultCustomFont } = require('./config')

class ResourceChecker {
  constructor(anyPhotoConfig) {
    this.anyPhotoConfig = anyPhotoConfig
    this.tip = tip
  }

  async checkAvatar() {
    const {
      anyPhotoConfig: { avatar }
    } = this
    const isValidAvatar = path.isAbsolute(avatar) ? true : await checkRemoteFileExists(avatar)
    if (!isValidAvatar) {
      this.colorTip({ key: 'avatar', value: avatar, position: 'remote' })
    }
    return isValidAvatar ? avatar : defaultAvatar
  }

  async checkCustomFont() {
    const { anyPhotoConfig } = this
    const {
      canvasSetting: { customFontPath = '', downloadCustomFontOutputDir = 'anyphoto-web-font' }
    } = anyPhotoConfig
    const customFont = this.checkOption({
      key: 'customFontPath',
      value: customFontPath,
      defaultValue: defaultCustomFont,
      checker(value) {
        const fontExtensions = ['.ttf', '.otf', '.woff', '.woff2']
        for (const extension of fontExtensions) {
          if (value.endsWith(extension)) {
            return true
          }
        }
        return false
      }
    })
    const shouldDownloadWebFont = !path.isAbsolute(customFont) && customFont
    if (!shouldDownloadWebFont) {
      return customFont
    } else {
      const isRemoteCustomFontExist = await checkRemoteFileExists(customFont, 'font')
      if (!isRemoteCustomFontExist) {
        this.tip({ key: 'customFontPath', value: customFontPath, position: 'remote' })
      }
      return await this.downloadWebFont(
        isRemoteCustomFontExist ? customFont : defaultCustomFont,
        downloadCustomFontOutputDir
      )
    }
  }

  async check() {
    const { anyPhotoConfig } = this
    return {
      ...anyPhotoConfig,
      avatar: await this.checkAvatar(),
      canvasSetting: {
        ...anyPhotoConfig.canvasSetting,
        customFontPath: await this.checkCustomFont()
      }
    }
  }

  checkOption({ key, value, defaultValue, checker = isImageUrl }) {
    if (!path.isAbsolute(value)) {
      if (/^(http:|https:)/.test(value)) {
        if (checker(value)) {
          return value
        } else {
          this.tip({ key, value, position: 'remote' })
          return defaultValue
        }
      } else {
        // TODO 对于一些不希望有默认值的配置项，这里需要特殊处理下
        if (key === 'customFontPath' && !value) {
          return value
        }
        this.tip({ key, value, position: 'remote' })
        return defaultValue
      }
    } else {
      if (fs.existsSync(value)) {
        if (checker(value)) {
          return value
        } else {
          this.tip({ key, value, position: 'local' })
          return defaultValue
        }
      } else {
        this.tip({ key, value, position: 'local' })
        return defaultValue
      }
    }
  }

  async downloadWebFont(customFontPath, downloadOutputDir) {
    try {
      const fontFileName = path.basename(customFontPath)
      const downloadWebFontFolder = path.join(process.cwd(), downloadOutputDir)
      if (!fs.existsSync(downloadWebFontFolder)) {
        fs.mkdirSync(downloadWebFontFolder, { recursive: true })
      }
      const downloadWebFontPath = path.join(downloadWebFontFolder, fontFileName)
      if (fs.existsSync(downloadWebFontPath)) {
        return downloadWebFontPath
      }
      const response = await axios.get(customFontPath, { responseType: 'arraybuffer' })
      fs.writeFileSync(downloadWebFontPath, response.data, 'binary')
      return downloadWebFontPath
    } catch (error) {
      colorTip(`Tips: download custom font [${color(customFontPath, 'red')}] error, please reset it\n`, 'yellow')
      return ''
    }
  }
}

module.exports = ResourceChecker
