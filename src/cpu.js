class Cpu {
  constructor({ canvasHeaderSetting, x, canvasWidth, authorWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x // 左边绘制的x坐标（计算过的）
    this.authorWidth = authorWidth
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
    switch (dom) {
      case 'avatar':
        return this.calculateAvatarCenterPointPosition()

      case 'author':
        return this.calculateAuthorStartPointPosition()
      case 'time':
        break

      default:
        return {}
    }
  }

  calculateAvatarCenterPointPosition() {
    const { headerAlign, headerPaddingTop, headerAvatarSize, headerAvatarBorderWidth } = this.canvasHeaderSetting
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
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          bottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }
    }
  }
  calculateAuthorStartPointPosition() {
    const { headerAlign, headerAvatarMarginBottom } = this.canvasHeaderSetting
    const { x } = this
    switch (headerAlign) {
      case 'left':
        return {
          authorStartPointX: x,
          authorStartPointY: this.calculateApplyAvatar.bottomY + headerAvatarMarginBottom
        }
      case 'center':
        return {
          authorStartPointX: x,
          authorStartPointY: this.calculateApplyAvatar.bottomY + headerAvatarMarginBottom
        }
      case 'right':
        return {
          authorStartPointX: x,
          authorStartPointY: this.calculateApplyAvatar.bottomY + headerAvatarMarginBottom
        }

      default:
        return {
          authorStartPointX: x,
          authorStartPointY: this.calculateApplyAvatar.bottomY + headerAvatarMarginBottom
        }
    }
  }
}

module.exports = Cpu
