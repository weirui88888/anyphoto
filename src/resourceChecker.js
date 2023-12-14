const path = require('path')
const fs = require('fs')
const axios = require('axios')
const isImageUrl = require('is-image-url')
const { checkRemoteFileExists, colorTip, color, tip } = require('./util')
const {
  defaultAvatar,
  defaultBackgroundImage,
  defaultCustomFont,
  defaultHeaderDescriptionPrefixIcon,
  defaultSloganIcon
} = require('./config')

class ResourceChecker {
  constructor(anyPhotoConfig) {
    this.anyPhotoConfig = anyPhotoConfig
    this.tip = tip
  }

  async checkAvatar() {
    const {
      anyPhotoConfig: { avatar }
    } = this
    const handleAvatar = this.checkOption({
      key: 'avatar',
      value: avatar,
      defaultValue: defaultAvatar
    })
    const isValidAvatar = path.isAbsolute(handleAvatar) ? true : await checkRemoteFileExists(handleAvatar)
    if (!isValidAvatar) {
      this.tip({ key: 'avatar', value: avatar, position: 'remote' })
    }
    return isValidAvatar ? handleAvatar : defaultAvatar
  }

  async checkBackgroundImage() {
    const {
      anyPhotoConfig: {
        canvasSetting: { backgroundImage }
      }
    } = this
    if (!backgroundImage || typeof backgroundImage !== 'string') return ''
    const handleBackgroundImage = this.checkOption({
      key: 'backgroundImage',
      value: backgroundImage,
      defaultValue: defaultBackgroundImage
    })
    const isValidBackgroundImage = path.isAbsolute(handleBackgroundImage)
      ? true
      : await checkRemoteFileExists(handleBackgroundImage)
    if (!isValidBackgroundImage) {
      console.log(123)
      this.tip({ key: 'backgroundImage', value: backgroundImage, position: 'remote' })
    }
    return isValidBackgroundImage ? handleBackgroundImage : defaultBackgroundImage
  }

  async checkHeaderDescriptionPrefixIcon() {
    const {
      anyPhotoConfig: {
        canvasSetting: {
          header: { showHeaderDescription, headerDescriptionPrefixIcon = '' }
        }
      }
    } = this
    if (!showHeaderDescription || !headerDescriptionPrefixIcon) return
    const descriptionPrefixIcon = this.checkOption({
      key: 'headerDescriptionPrefixIcon',
      value: headerDescriptionPrefixIcon,
      defaultValue: defaultHeaderDescriptionPrefixIcon
    })
    const isValidAvatarHeaderDescriptionPrefixIcon = path.isAbsolute(descriptionPrefixIcon)
      ? true
      : await checkRemoteFileExists(descriptionPrefixIcon)
    if (!isValidAvatarHeaderDescriptionPrefixIcon) {
      this.tip({ key: 'headerDescriptionPrefixIcon', value: headerDescriptionPrefixIcon, position: 'remote' })
    }
    return isValidAvatarHeaderDescriptionPrefixIcon ? descriptionPrefixIcon : defaultHeaderDescriptionPrefixIcon
  }

  async checkSloganIcon() {
    const {
      anyPhotoConfig: {
        canvasSetting: {
          footer: { sloganIcon }
        }
      }
    } = this
    if (!sloganIcon) return
    const handleSloganIcon = this.checkOption({
      key: 'sloganIcon',
      value: sloganIcon,
      defaultValue: defaultSloganIcon
    })
    const isValidSloganIcon = path.isAbsolute(handleSloganIcon) ? true : await checkRemoteFileExists(handleSloganIcon)
    if (!isValidSloganIcon) {
      this.tip({ key: 'sloganIcon', value: sloganIcon, position: 'remote' })
    }
    return isValidSloganIcon ? handleSloganIcon : defaultSloganIcon
  }

  async checkCustomFont() {
    const { anyPhotoConfig } = this
    const {
      canvasSetting: {
        customFontPath = '',
        downloadCustomFontOutputDir = 'anyphoto-web-font',
        downloadCustomFontRelativeOutputPath = ''
      }
    } = anyPhotoConfig
    const handleCustomFont = this.checkOption({
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
    const shouldDownloadWebFont = !path.isAbsolute(handleCustomFont) && handleCustomFont
    if (!shouldDownloadWebFont) {
      return handleCustomFont
    } else {
      const isRemoteCustomFontExist = await checkRemoteFileExists(handleCustomFont, 'font')
      if (!isRemoteCustomFontExist) {
        this.tip({ key: 'customFontPath', value: customFontPath, position: 'remote' })
      }
      return await this.downloadWebFont(
        isRemoteCustomFontExist ? handleCustomFont : defaultCustomFont,
        downloadCustomFontRelativeOutputPath,
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
        backgroundImage: await this.checkBackgroundImage(),
        customFontPath: await this.checkCustomFont(),
        header: {
          ...anyPhotoConfig.canvasSetting.header,
          headerDescriptionPrefixIcon: await this.checkHeaderDescriptionPrefixIcon()
        },
        footer: {
          ...anyPhotoConfig.canvasSetting.footer,
          sloganIcon: await this.checkSloganIcon()
        }
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
        if (!value) {
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

  async downloadWebFont(customFontPath, downloadRelativeOutputPath, downloadOutputDir) {
    try {
      const fontFileName = path.basename(customFontPath)
      const downloadWebFontFolder = path.join(process.cwd(), downloadRelativeOutputPath, downloadOutputDir)
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
