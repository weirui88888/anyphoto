const isImageUrl = require('is-image-url')
class Cpu {
  constructor({ canvasHeaderSetting, x, canvasWidth, authorWidth, timeWidthPrefixWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x // 左边绘制的x坐标（计算过的）
    this.authorWidth = authorWidth // author width
    this.canvasWidth = canvasWidth // canvas width
    this.timeWidthPrefixWidth = timeWidthPrefixWidth
  }
  calculateApplyHeader() {
    return {
      avatar: this.calculateApplyAvatar,
      author: this.calculateApplyAuthor,
      time: this.calculateApplyTime
    }
  }
  get getHeaderHeight() {
    const { headerPaddingBottom } = this.canvasHeaderSetting
    return this.calculateApplyTime.timeBottomY + headerPaddingBottom
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

  get calculateApplyTimeIcon() {
    const {
      headerTimeFontSize: timeIconWidth,
      headerTimeFontSize: timeIconHeight,
      headerTimeIcon
    } = this.canvasHeaderSetting
    return {
      timeIconWidth,
      timeIconHeight,
      headerTimeIcon,
      ...this.calculateDomProperty('timeIcon')
    }
  }
  get calculateApplyTime() {
    const {
      showHeaderTime,
      headerTimeFontSize,
      headerTimeFontWeight,
      headerTimeFontColor,
      headerTimeFontSizeIndex,
      headerTimeIcon
    } = this.canvasHeaderSetting
    return {
      showHeaderTime,
      headerTimeFontSize,
      headerTimeFontWeight,
      headerTimeFontColor,
      headerTimeFontSizeIndex,
      headerTimeIcon,
      ...this.calculateDomProperty('time')
    }
  }
  calculateDomProperty(dom) {
    switch (dom) {
      case 'avatar':
        return this.calculateAvatarCenterPointPosition
      case 'author':
        return this.calculateAuthorStartPointPosition
      case 'timeIcon':
        return this.calculateTimeIconStartPointPosition
      case 'time':
        return this.calculateTimeStartPointPosition
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
          avatarBottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }
      case 'center':
        return {
          avatarCenterPointX: canvasWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          avatarBottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }
      case 'right':
        return {
          avatarCenterPointX: canvasWidth - x - headerAvatarSize / 2 - headerAvatarBorderWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          avatarBottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }

      default:
        return {
          avatarCenterPointX: canvasWidth / 2,
          avatarCenterPointY: headerPaddingTop + headerAvatarSize / 2,
          avatarBottomY: headerPaddingTop + headerAvatarSize + headerAvatarBorderWidth // avatar bottom point y
        }
    }
  }
  get calculateAuthorStartPointPosition() {
    const { headerAlign, headerAvatarMarginBottom, headerAvatarBorderWidth, showHeaderAuthor, headerAuthorFontSize } =
      this.canvasHeaderSetting
    const { x, authorWidth, canvasWidth } = this
    const { avatarBottomY, avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    const authorStartPointY = avatarBottomY + headerAvatarMarginBottom
    // 不展示作者也计算authorBottomY
    const authorBottomY = showHeaderAuthor ? authorStartPointY + headerAuthorFontSize : authorStartPointY
    switch (headerAlign) {
      case 'left':
        return {
          authorStartPointX: x,
          authorStartPointY,
          authorBottomY
        }
      case 'center':
        return {
          authorStartPointX: avatarCenterPointX - authorWidth / 2,
          authorStartPointY,
          authorBottomY
        }
      case 'right':
        return {
          authorStartPointX: canvasWidth - x - authorWidth - headerAvatarBorderWidth,
          authorStartPointY,
          authorBottomY
        }

      default:
        return {
          authorStartPointX: avatarCenterPointX - authorWidth / 2,
          authorStartPointY,
          authorBottomY
        }
    }
  }
  // calculate inspiration come by calculateTimeStartPointPosition
  get calculateTimeIconStartPointPosition() {
    const {
      headerAlign,
      headerAvatarBorderWidth,
      showHeaderAuthor,
      headerAuthorMarginBottom,
      headerTimeIcon,
      headerTimeIconGap,
      headerTimeFontSize
    } = this.canvasHeaderSetting
    const { x, timeWidthPrefixWidth, canvasWidth } = this
    const { authorBottomY } = this.calculateAuthorStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    // 根据是否展示作者展示进行判断，没作者
    const timeIconStartPointY = showHeaderAuthor ? authorBottomY + headerAuthorMarginBottom : authorBottomY
    if (isImageUrl(headerTimeIcon)) {
      switch (headerAlign) {
        case 'left':
          return {
            showHeaderTimeIcon: true,
            timeIconStartPointX: x,
            timeIconStartPointY
          }
        case 'center':
          return {
            showHeaderTimeIcon: true,
            timeIconStartPointX:
              avatarCenterPointX - (timeWidthPrefixWidth + headerTimeFontSize + headerTimeIconGap) / 2,
            timeIconStartPointY
          }
        case 'right':
          return {
            showHeaderTimeIcon: true,
            timeIconStartPointX:
              canvasWidth - x - timeWidthPrefixWidth - headerAvatarBorderWidth - headerTimeFontSize - headerTimeIconGap,
            timeIconStartPointY
          }
        default:
          return {
            showHeaderTimeIcon: false
          }
      }
    } else {
      return {
        showHeaderTimeIcon: false
      }
    }
  }
  get calculateTimeStartPointPosition() {
    const {
      headerAlign,
      headerAvatarBorderWidth,
      showHeaderAuthor,
      headerAuthorMarginBottom,
      headerTimeIconGap,
      headerTimeFontSize,
      showHeaderTime
    } = this.canvasHeaderSetting
    const { x, timeWidthPrefixWidth, canvasWidth } = this
    const { authorBottomY } = this.calculateAuthorStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    const { showHeaderTimeIcon, timeIconStartPointX } = this.calculateTimeIconStartPointPosition
    // 根据是否展示作者展示进行判断，没作者
    const timeStartPointY = showHeaderAuthor ? authorBottomY + headerAuthorMarginBottom : authorBottomY
    const timeBottomY = showHeaderTime ? timeStartPointY + headerTimeFontSize : timeStartPointY
    const timeStartWithIconPointX = timeIconStartPointX + headerTimeFontSize + headerTimeIconGap
    switch (headerAlign) {
      case 'left':
        return {
          timeStartPointX: showHeaderTimeIcon ? timeStartWithIconPointX : x,
          timeStartPointY,
          timeBottomY
        }
      case 'center':
        return {
          timeStartPointX: showHeaderTimeIcon ? timeStartWithIconPointX : avatarCenterPointX - timeWidthPrefixWidth / 2,
          timeStartPointY,
          timeBottomY
        }
      case 'right':
        return {
          timeStartPointX: showHeaderTimeIcon
            ? timeStartWithIconPointX
            : canvasWidth - x - timeWidthPrefixWidth - headerAvatarBorderWidth,
          timeStartPointY,
          timeBottomY
        }

      default:
        return {
          timeStartPointX: showHeaderTimeIcon ? timeStartWithIconPointX : avatarCenterPointX - timeWidthPrefixWidth / 2,
          timeStartPointY,
          timeBottomY
        }
    }
  }
}

module.exports = Cpu
