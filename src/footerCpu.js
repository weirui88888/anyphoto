const isImageUrl = require('is-image-url')
class FooterCpu {
  constructor({ canvasFooterSetting, x, canvasWidth, headerHeight, contentHeight, sloganWidth }) {
    this.canvasFooterSetting = canvasFooterSetting
    this.x = x
    this.canvasWidth = canvasWidth
    this.grandTotalHeight = headerHeight + contentHeight
    this.sloganWidth = sloganWidth
  }
  get getFooterHeight() {
    const { paddingY, sloganFontSize } = this.canvasFooterSetting
    return paddingY * 2 + sloganFontSize + sloganFontSize / 2
  }
  get calculateApplySlogan() {
    const { slogan, sloganFontSize, sloganFontColor, sloganFontWeight, sloganFontFamilyIndex } =
      this.canvasFooterSetting

    return {
      slogan,
      sloganFontSize,
      sloganFontColor,
      sloganFontWeight,
      sloganFontFamilyIndex,
      ...this.calculateSloganPosition
    }
  }
  get calculateApplyQrCode() {
    const { qrCodeSrc } = this.canvasFooterSetting
    if (isImageUrl(qrCodeSrc)) {
      return {
        showQrCode: true,
        qrCodeSrc,
        ...this.calculateQrCodePosition
      }
    } else {
      return {
        showQrCode: false
      }
    }
  }
  get calculateSloganPosition() {
    const { paddingY, sloganPosition } = this.canvasFooterSetting
    const { sloganWidth, x, canvasWidth, grandTotalHeight } = this
    switch (sloganPosition) {
      case 'left':
        return {
          sloganStartPointX: x,
          sloganStartPointY: paddingY + grandTotalHeight
        }
      case 'right':
        return {
          sloganStartPointX: canvasWidth - x - sloganWidth,
          sloganStartPointY: paddingY + grandTotalHeight
        }
      default:
        return {
          sloganStartPointX: x,
          sloganStartPointY: paddingY + grandTotalHeight
        }
    }
  }
  get calculateQrCodePosition() {
    const { qrCodePaddingY, sloganPosition } = this.canvasFooterSetting
    const qrCodeWidth = this.getFooterHeight - qrCodePaddingY * 2
    const { x, canvasWidth, grandTotalHeight } = this
    switch (sloganPosition) {
      case 'left':
        return {
          qrCodeStartPointX: canvasWidth - x - qrCodeWidth,
          qrCodeStartPointY: qrCodePaddingY + grandTotalHeight,
          qrCodeWidth
        }
      case 'right':
        return {
          qrCodeStartPointX: x,
          qrCodeStartPointY: qrCodePaddingY + grandTotalHeight,
          qrCodeWidth
        }
      default:
        return {
          qrCodeStartPointX: canvasWidth - x - qrCodeWidth,
          qrCodeStartPointY: qrCodePaddingY + grandTotalHeight,
          qrCodeWidth
        }
    }
  }
}

module.exports = FooterCpu
