class Cpu {
  constructor({ canvasHeaderSetting, x, canvasWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x // 左边绘制的x坐标（计算过的）
    this.canvasWidth = canvasWidth // canvas width
  }
  calculateApplyHeader() {
    return {
      avatar: this.calculateApplyAvatar
    }
  }

  get calculateApplyAvatar() {
    const { headerAvatarSize, headerAvatarBorderWidth, headerAvatarBorderColor } = this.canvasHeaderSetting
    return {
      ...this.calculateDomProperty('avatar'),
      avatarSize: headerAvatarSize,
      avatarRadius: headerAvatarSize / 2,
      headerAvatarBorderWidth,
      headerAvatarBorderColor
    }
  }
  get calculateApplyAuthor() {
    const { headerShowAuthor, headerAuthorFontSize, headerAuthorFontWeight } = this.canvasHeaderSetting
    return {
      headerShowAuthor,
      headerAuthorFontSize,
      headerAuthorFontWeight
    }
  }
  calculateDomProperty(dom) {
    const {
      headerAlign,
      headerPaddingTop,
      headerAvatarSize,
      headerAvatarBorderWidth,
      headerAvatarBorderColor,
      headerShowAuthor,
      headerAuthorFontSize,
      headerAuthorMarginTop,
      headerAuthorMarginBottom,
      headerAuthorFontWeight
    } = this.canvasHeaderSetting
    switch (dom) {
      case 'avatar':
        return this.calculateAvatarCenterPointPosition()

      case 'author':
        break

      case 'time':
        break

      default:
        return {}
    }
  }
  calculateAvatarCenterPointPosition() {
    const { headerAlign, headerPaddingTop, headerAvatarSize, headerAvatarBorderWidth, headerAvatarBorderColor } =
      this.canvasHeaderSetting
    const { x, canvasWidth } = this
    switch (headerAlign) {
      case 'left':
        return {
          avatarCenterPointX: x + headerAvatarSize / 2 + headerAvatarBorderWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          bottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }
      case 'center':
        return {
          avatarCenterPointX: canvasWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          bottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }
      case 'right':
        return {
          avatarCenterPointX: canvasWidth - x - headerAvatarSize / 2 - headerAvatarBorderWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          bottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }

      default:
        return {
          avatarCenterPointX: canvasWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2
        }
    }
  }
}

module.exports = Cpu
