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

  get calculateApplySloganIcon() {
    const { sloganIcon } = this.canvasFooterSetting
    if (isImageUrl(sloganIcon)) {
      return {
        showSloganIcon: true,
        sloganIcon,
        ...this.calculateSloganIconPosition
      }
    } else {
      return {
        showSloganIcon: false
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

  get calculateSloganIconPosition() {
    const { sloganIconPaddingY, sloganPosition } = this.canvasFooterSetting
    const sloganIconWidth = this.getFooterHeight - sloganIconPaddingY * 2
    const { x, canvasWidth, grandTotalHeight } = this
    switch (sloganPosition) {
      case 'left':
        return {
          sloganIconStartPointX: canvasWidth - x - sloganIconWidth,
          sloganIconStartPointY: sloganIconPaddingY + grandTotalHeight,
          sloganIconWidth
        }
      case 'right':
        return {
          sloganIconStartPointX: x,
          sloganIconStartPointY: sloganIconPaddingY + grandTotalHeight,
          sloganIconWidth
        }
      default:
        return {
          sloganIconStartPointX: canvasWidth - x - sloganIconWidth,
          sloganIconStartPointY: sloganIconPaddingY + grandTotalHeight,
          sloganIconWidth
        }
    }
  }
}

module.exports = FooterCpu
