const isImageUrl = require('is-image-url')
class HeaderCpu {
  constructor({ canvasHeaderSetting, x, canvasWidth, authorWidth, descriptionWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x
    this.authorWidth = authorWidth
    this.canvasWidth = canvasWidth
    this.descriptionWidth = descriptionWidth
  }

  calculateApplyHeader() {
    return {
      avatar: this.calculateApplyAvatar,
      author: this.calculateApplyAuthor,
      description: this.calculateApplyDescription
    }
  }

  get getHeaderHeight() {
    const { headerPaddingBottom } = this.canvasHeaderSetting
    return this.calculateApplyDescription.descriptionBottomY + headerPaddingBottom
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
      headAuthorFontFamilyIndex
    } = this.canvasHeaderSetting
    return {
      showHeaderAuthor,
      headerAuthorFontSize,
      headerAuthorFontWeight,
      headerAuthorFontColor,
      headAuthorFontFamilyIndex,
      ...this.calculateDomProperty('author')
    }
  }

  get calculateApplyDescriptionIcon() {
    const {
      headerDescriptionFontSize: descriptionIconWidth,
      headerDescriptionFontSize: descriptionIconHeight,
      headerDescriptionPrefixIcon
    } = this.canvasHeaderSetting
    return {
      descriptionIconWidth,
      descriptionIconHeight,
      headerDescriptionPrefixIcon,
      ...this.calculateDomProperty('descriptionIcon')
    }
  }

  get calculateApplyDescription() {
    const {
      showHeaderDescription,
      headerDescriptionFontSize,
      headerDescriptionFontWeight,
      headerDescriptionFontColor,
      headerDescriptionFontFamilyIndex,
      headerDescriptionPrefixIcon
    } = this.canvasHeaderSetting
    return {
      showHeaderDescription,
      headerDescriptionFontSize,
      headerDescriptionFontWeight,
      headerDescriptionFontColor,
      headerDescriptionFontFamilyIndex,
      headerDescriptionPrefixIcon,
      ...this.calculateDomProperty('description')
    }
  }

  calculateDomProperty(dom) {
    switch (dom) {
      case 'avatar':
        return this.calculateAvatarCenterPointPosition
      case 'author':
        return this.calculateAuthorStartPointPosition
      case 'descriptionIcon':
        return this.calculateDescriptionIconStartPointPosition
      case 'description':
        return this.calculateDescriptionStartPointPosition
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
    // authorBottomY is also calculated even if the author is not displayed.
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

  get calculateDescriptionIconStartPointPosition() {
    const {
      headerAlign,
      headerAvatarBorderWidth,
      showHeaderAuthor,
      headerAuthorMarginBottom,
      headerDescriptionPrefixIcon,
      headerDescriptionPrefixIconGap,
      headerDescriptionPrefixIconOffsetY,
      headerDescriptionFontSize
    } = this.canvasHeaderSetting
    const { x, descriptionWidth, canvasWidth } = this
    const { authorBottomY } = this.calculateAuthorStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    // Judgment based on whether author display is shown
    const descriptionIconStartPointY = showHeaderAuthor
      ? authorBottomY + headerAuthorMarginBottom + headerDescriptionPrefixIconOffsetY
      : authorBottomY + headerDescriptionPrefixIconOffsetY
    if (isImageUrl(headerDescriptionPrefixIcon)) {
      switch (headerAlign) {
        case 'left':
          return {
            showDescriptionIcon: true,
            descriptionIconStartPointX: x,
            descriptionIconStartPointY
          }
        case 'center':
          return {
            showDescriptionIcon: true,
            descriptionIconStartPointX:
              avatarCenterPointX - (descriptionWidth + headerDescriptionFontSize + headerDescriptionPrefixIconGap) / 2,
            descriptionIconStartPointY
          }
        case 'right':
          return {
            showDescriptionIcon: true,
            descriptionIconStartPointX:
              canvasWidth -
              x -
              descriptionWidth -
              headerAvatarBorderWidth -
              headerDescriptionFontSize -
              headerDescriptionPrefixIconGap,
            descriptionIconStartPointY
          }
        default:
          return {
            showDescriptionIcon: false
          }
      }
    } else {
      return {
        showDescriptionIcon: false
      }
    }
  }

  get calculateDescriptionStartPointPosition() {
    const {
      headerAlign,
      headerAvatarBorderWidth,
      showHeaderAuthor,
      headerAuthorMarginBottom,
      headerDescriptionPrefixIconGap,
      headerDescriptionFontSize,
      showHeaderDescription
    } = this.canvasHeaderSetting
    const { x, descriptionWidth, canvasWidth } = this
    const { authorBottomY } = this.calculateAuthorStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    const { showDescriptionIcon, descriptionIconStartPointX } = this.calculateDescriptionIconStartPointPosition
    // Judgment based on whether author display is shown
    const descriptionStartPointY = showHeaderAuthor ? authorBottomY + headerAuthorMarginBottom : authorBottomY
    const descriptionBottomY = showHeaderDescription
      ? descriptionStartPointY + headerDescriptionFontSize
      : descriptionStartPointY
    const descriptionStartWithIconPointX =
      descriptionIconStartPointX + headerDescriptionFontSize + headerDescriptionPrefixIconGap
    switch (headerAlign) {
      case 'left':
        return {
          descriptionStartPointX: showDescriptionIcon ? descriptionStartWithIconPointX : x,
          descriptionStartPointY,
          descriptionBottomY
        }
      case 'center':
        return {
          descriptionStartPointX: showDescriptionIcon
            ? descriptionStartWithIconPointX
            : avatarCenterPointX - descriptionWidth / 2,
          descriptionStartPointY,
          descriptionBottomY
        }
      case 'right':
        return {
          descriptionStartPointX: showDescriptionIcon
            ? descriptionStartWithIconPointX
            : canvasWidth - x - descriptionWidth - headerAvatarBorderWidth,
          descriptionStartPointY,
          descriptionBottomY
        }

      default:
        return {
          descriptionStartPointX: showDescriptionIcon
            ? descriptionStartWithIconPointX
            : avatarCenterPointX - descriptionWidth / 2,
          descriptionStartPointY,
          descriptionBottomY
        }
    }
  }
}

module.exports = HeaderCpu
