class Cpu {
  constructor({ canvasHeaderSetting, x, canvasWidth, authorWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x // 左边绘制的x坐标（计算过的）
    this.authorWidth = authorWidth // author width
    this.canvasWidth = canvasWidth // canvas width
  }
  calculateApplyHeader() {
    return {
      avatar: this.calculateApplyAvatar,
      author: this.calculateApplyAuthor
    }
  }

  get calculateApplyAvatar() {
    const { headerAvatarSize, headerAvatarBorderWidth, headerAvatarBorderColor } = this.canvasHeaderSetting
    return {
      avatarSize: headerAvatarSize,
      avatarRadius: headerAvatarSize / 2,
      headerAvatarBorderWidth,
      headerAvatarBorderColor,
      ...this.calculateDomProperty('avatar')
    }
  }
  get calculateApplyAuthor() {
    const {
      showHeaderAuthor,
      headerAuthorFontSize,
      headerAuthorFontWeight,
      headerAuthorFontColor,
      headAuthorFontSizeIndex
    } = this.canvasHeaderSetting
    return {
      showHeaderAuthor,
      headerAuthorFontSize,
      headerAuthorFontWeight,
      headerAuthorFontColor,
      headAuthorFontSizeIndex,
      ...this.calculateDomProperty('author')
    }
  }
  calculateDomProperty(dom) {
    switch (dom) {
      case 'avatar':
        return this.calculateAvatarCenterPointPosition

      case 'author':
        return this.calculateAuthorStartPointPosition
      case 'time':
        break

      default:
        return {}
    }
  }

  get calculateAvatarCenterPointPosition() {
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
  get calculateAuthorStartPointPosition() {
    const { headerAlign, headerAvatarMarginBottom, headerAvatarBorderWidth } = this.canvasHeaderSetting
    const { x, authorWidth, canvasWidth } = this
    const { bottomY, avatarCenterPointX } = this.calculateAvatarCenterPointPosition

    switch (headerAlign) {
      case 'left':
        return {
          authorStartPointX: x,
          authorStartPointY: bottomY + headerAvatarMarginBottom
        }
      case 'center':
        return {
          authorStartPointX: avatarCenterPointX - authorWidth / 2,
          authorStartPointY: bottomY + headerAvatarMarginBottom
        }
      case 'right':
        return {
          authorStartPointX: canvasWidth - x - authorWidth - headerAvatarBorderWidth,
          authorStartPointY: bottomY + headerAvatarMarginBottom
        }

      default:
        return {
          authorStartPointX: avatarCenterPointX - authorWidth / 2,
          authorStartPointY: bottomY + headerAvatarMarginBottom
        }
    }
  }
}

module.exports = Cpu
