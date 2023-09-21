class Cpu {
  constructor({ header, x, width, footer = {}, contentHeight = 0 }) {
    this.header = header
    this.footer = footer
    this.contentHeight = contentHeight
    this.x = x
    this.width = width
  }
  calculateApplyHeader() {
    // const {
    //   headerAlign,
    //   headerPaddingTop,
    //   headerPaddingBottom,
    //   headerAvatarSize,
    //   headerShowAuthor,
    //   headerAuthorFontSize,
    //   headerShowCreateTime,
    //   headerCreateTimePrefix
    // } = this.header
    return {
      avatar: this.calculateApplyAvatar()
    }
  }

  calculateApplyAvatar() {
    const { headerAlign, headerPaddingTop, headerAvatarSize, headerAvatarBorderWidth, headerAvatarBorderColor } =
      this.header
    return {
      avatarSize: headerAvatarSize,
      property: this.calculateDomProperty('avatar'),
      headerAvatarBorderWidth,
      headerAvatarBorderColor
    }
  }
  calculateDomProperty(dom) {
    const { headerAlign, headerPaddingTop, headerAvatarSize, headerAvatarBorderWidth, headerAvatarBorderColor } =
      this.header
    switch (dom) {
      case 'avatar':
        return {
          avatarRadius: headerAvatarSize / 2,
          ...this.calculateAvatarCenterPointPosition()
        }
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
      this.header
    const { x, width } = this
    switch (headerAlign) {
      case 'left':
        return {
          avatarCenterPointX: x + headerAvatarSize / 2 + headerAvatarBorderWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2
        }
      case 'center':
        return {
          avatarCenterPointX: width / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2
        }
      case 'right':
        return {
          avatarCenterPointX: width - x - headerAvatarSize / 2 - headerAvatarBorderWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2
        }

      default:
        return {
          avatarCenterPointX: width / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2
        }
    }
  }
}

module.exports = Cpu
