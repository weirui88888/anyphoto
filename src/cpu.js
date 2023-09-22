class Cpu {
  constructor({ canvasHeaderSetting, x, canvasWidth, authorWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x // 左边绘制的x坐标（计算过的）
    this.authorWidth = authorWidth // author width
    this.canvasWidth = canvasWidth // canvas width
    this.timeWidth = 400
  }
  calculateApplyHeader() {
    return {
      avatar: this.calculateApplyAvatar,
      author: this.calculateApplyAuthor,
      time: this.calculateApplyTime
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

  get calculateApplyTime() {
    const { showHeaderTime, headerTimeFontSize, headerTimeFontWeight, headerTimeFontColor, headerTimeFontSizeIndex } =
      this.canvasHeaderSetting
    return {
      showHeaderTime,
      headerTimeFontSize,
      headerTimeFontWeight,
      headerTimeFontColor,
      headerTimeFontSizeIndex,
      ...this.calculateDomProperty('time')
    }
  }
  calculateDomProperty(dom) {
    switch (dom) {
      case 'avatar':
        return this.calculateAvatarCenterPointPosition
      case 'author':
        return this.calculateAuthorStartPointPosition
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
  get calculateTimeStartPointPosition() {
    const { headerAlign, headerAvatarBorderWidth, showHeaderAuthor, headerAuthorMarginBottom } =
      this.canvasHeaderSetting
    const { x, timeWidth, canvasWidth } = this
    const { authorBottomY } = this.calculateAuthorStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    // 根据是否展示作者展示进行判断，没作者
    const timeStartPointY = showHeaderAuthor ? authorBottomY + headerAuthorMarginBottom : authorBottomY
    switch (headerAlign) {
      case 'left':
        return {
          timeStartPointX: x,
          timeStartPointY,
          timeBottomY: 0
        }
      case 'center':
        return {
          timeStartPointX: avatarCenterPointX - timeWidth / 2,
          timeStartPointY,
          timeBottomY: 0
        }
      case 'right':
        return {
          timeStartPointX: canvasWidth - x - timeWidth - headerAvatarBorderWidth,
          timeStartPointY,
          timeBottomY: 0
        }

      default:
        return {
          timeStartPointX: avatarCenterPointX - timeWidth / 2,
          timeStartPointY,
          timeBottomY: 0
        }
    }
  }
}

module.exports = Cpu
