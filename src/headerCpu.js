const isImageUrl = require('is-image-url')
class HeaderCpu {
  constructor({ canvasHeaderSetting, x, canvasWidth, titleWidth, descriptionWidth }) {
    this.canvasHeaderSetting = canvasHeaderSetting
    this.x = x
    this.titleWidth = titleWidth
    this.canvasWidth = canvasWidth
    this.descriptionWidth = descriptionWidth
  }

  calculateApplyHeader() {
    return {
      avatar: this.calculateApplyAvatar,
      title: this.calculateApplyTitle,
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

  get calculateApplyTitle() {
    const {
      showHeaderTitle,
      headerTitleFontSize,
      headerTitleFontWeight,
      headerTitleFontColor,
      headerTitleFontFamilyIndex
    } = this.canvasHeaderSetting
    return {
      showHeaderTitle,
      headerTitleFontSize,
      headerTitleFontWeight,
      headerTitleFontColor,
      headerTitleFontFamilyIndex,
      ...this.calculateDomProperty('title')
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
      case 'title':
        return this.calculateTitleStartPointPosition
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

  get calculateTitleStartPointPosition() {
    const { headerAlign, headerAvatarMarginBottom, headerAvatarBorderWidth, showHeaderTitle, headerTitleFontSize } =
      this.canvasHeaderSetting
    const { x, titleWidth, canvasWidth } = this
    const { avatarBottomY, avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    const titleStartPointY = avatarBottomY + headerAvatarMarginBottom
    // titleBottomY is also calculated even if the title is not displayed.
    const titleBottomY = showHeaderTitle ? titleStartPointY + headerTitleFontSize : titleStartPointY
    switch (headerAlign) {
      case 'left':
        return {
          titleStartPointX: x,
          titleStartPointY,
          titleBottomY
        }
      case 'center':
        return {
          titleStartPointX: avatarCenterPointX - titleWidth / 2,
          titleStartPointY,
          titleBottomY
        }
      case 'right':
        return {
          titleStartPointX: canvasWidth - x - titleWidth - headerAvatarBorderWidth,
          titleStartPointY,
          titleBottomY
        }

      default:
        return {
          titleStartPointX: avatarCenterPointX - titleWidth / 2,
          titleStartPointY,
          titleBottomY
        }
    }
  }

  get calculateDescriptionIconStartPointPosition() {
    const {
      headerAlign,
      headerAvatarBorderWidth,
      showHeaderTitle,
      headerTitleMarginBottom,
      headerDescriptionPrefixIcon,
      headerDescriptionPrefixIconGap,
      headerDescriptionPrefixIconOffsetY,
      headerDescriptionFontSize
    } = this.canvasHeaderSetting
    const { x, descriptionWidth, canvasWidth } = this
    const { titleBottomY } = this.calculateTitleStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    // Judgment based on whether title display is shown
    const descriptionIconStartPointY = showHeaderTitle
      ? titleBottomY + headerTitleMarginBottom + headerDescriptionPrefixIconOffsetY
      : titleBottomY + headerDescriptionPrefixIconOffsetY
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
      showHeaderTitle,
      headerTitleMarginBottom,
      headerDescriptionPrefixIconGap,
      headerDescriptionFontSize,
      showHeaderDescription
    } = this.canvasHeaderSetting
    const { x, descriptionWidth, canvasWidth } = this
    const { titleBottomY } = this.calculateTitleStartPointPosition
    const { avatarCenterPointX } = this.calculateAvatarCenterPointPosition
    const { showDescriptionIcon, descriptionIconStartPointX } = this.calculateDescriptionIconStartPointPosition
    // Judgment based on whether title display is shown
    const descriptionStartPointY = showHeaderTitle ? titleBottomY + headerTitleMarginBottom : titleBottomY
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
