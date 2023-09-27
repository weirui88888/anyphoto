const { createCanvas, registerFont, loadImage } = require('canvas')
const { barWatcher, formatDateTime } = require('./util')
const HeaderCpu = require('./headerCpu')
const FooterCpu = require('./footerCpu')
const base64Img = require('base64-img')

class Drawer {
  constructor({ content, anyPhotoConfig }) {
    const {
      width,
      fontFamilys,
      customFontFamilyPath,
      fallbackFontFamilyIndex,
      color,
      backgroundColor,
      fontSize,
      fontWeight,
      lineGap,
      x,
      y,
      textBaseline,
      textAlign,
      fontFamilyIndex,
      header,
      footer,
      from
    } = anyPhotoConfig.canvasSetting
    if (customFontFamilyPath) {
      registerFont(customFontFamilyPath, {
        family: 'Custom'
      })
    }
    this.anyPhotoConfig = anyPhotoConfig
    this.fallbackFontFamilyIndex = fallbackFontFamilyIndex
    this.width = width
    this.fontWeight = fontWeight
    this.fontFamilys = fontFamilys
    this.color = color
    this.backgroundColor = backgroundColor
    this.maxLineWidth = width - x * 2 // 这里只是预设最大宽度，也就是用width - x * 2，需要先有它，才能计算出来布局，以及每行实际绘制的宽度
    this.fontSize = fontSize
    this.fontFamilyIndex = fontFamilyIndex
    this.barWatcher = barWatcher

    // content
    this.lineGap = lineGap
    this.textBaseline = textBaseline
    this.textAlign = textAlign
    this.y = y
    this.content = content
    this.canvas = createCanvas(this.width, 1)
    this.ctx = this.canvas.getContext('2d')
    this.lineWidthMap = new Map()
    this.totalLineNumber = this.calculateContentTotalLine()
    this.compareHeight = 0
    const maxLineWidth = this.getMaxLineWidth()
    this.x = this.lineWidthMap.size > 1 ? this.setSuitableXWidth(maxLineWidth, this.width, x) : x

    // header
    this.header = header
    this.author = this.anyPhotoConfig.author
    this.avatar = this.anyPhotoConfig.avatar
    this.headerHeight = 0

    // from
    this.from = from
    // footer
    this.footer = footer
  }

  async setupCpu() {
    const { from = {}, ctx } = this
    const { showFrom, fromFontSize, fromMarginTop } = from
    this.barWatcher.start(5, 1, { step: '初始化中' })
    this.compareHeight = this.fontSize >= this.lineGap ? this.lineGap / 2 : this.fontSize / 2
    this.contentHeight =
      (this.totalLineNumber - 1) * this.lineGap + this.totalLineNumber * this.fontSize + this.y * 2 + this.compareHeight
    if (showFrom) {
      this.contentHeight = this.contentHeight + fromFontSize + fromMarginTop
    }
    ctx.save()
    this.headerCpu = new HeaderCpu({
      canvasHeaderSetting: this.header,
      x: this.x,
      canvasWidth: this.width,
      authorWidth: this.calculateAuthorWidth,
      timeWidthPrefixWidth: this.calculateTimeWithPrefixWidth
    })
    this.headerHeight = this.headerCpu.getHeaderHeight
    this.height = this.headerHeight + this.contentHeight

    this.footerCpu = new FooterCpu({
      canvasFooterSetting: this.footer,
      x: this.x,
      canvasWidth: this.width,
      headerHeight: this.headerHeight,
      contentHeight: this.contentHeight,
      sloganWidth: this.calculateSloganWidth
    })
    this.footerHeight = this.footerCpu.getFooterHeight
    this.height = this.height + this.footerHeight
    this.canvas = createCanvas(this.width, this.height)
    this.ctx = this.canvas.getContext('2d')
    return this
  }

  async setupFrom() {
    const { y, ctx, x, from = {} } = this
    const { showFrom, name, fromFontSize, fromFontColor, fromFontWeight, fromFontFamilyIndex } = from
    if (showFrom) {
      ctx.save()
      ctx.fillStyle = fromFontColor
      ctx.font = this.setupFont(fromFontWeight, fromFontSize, fromFontFamilyIndex)
      ctx.textBaseline = this.textBaseline
      ctx.textAlign = this.textAlign
      ctx.fillText(name, x, this.headerHeight + this.contentHeight - fromFontSize - y - this.compareHeight)
      ctx.restore()
    }
    return this
  }

  async setupCanvas() {
    this.barWatcher.setTotal(3)

    this.barWatcher.update(2, {
      step: '设置画布中'
    })
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.backgroundColor
    ctx.fillRect(0, 0, this.width, this.height)
    return this
  }

  // todo应该需要想个办法，去智能的判断字体的宽度，是否大于canvasWidth-2*x
  get calculateAuthorWidth() {
    const { headerAuthorFontColor, headerAuthorFontSize, headerAuthorFontWeight, headAuthorFontFamilyIndex } =
      this.header
    const { author } = this
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = headerAuthorFontColor
    ctx.font = this.setupFont(headerAuthorFontWeight, headerAuthorFontSize, headAuthorFontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    const authorWidth = ctx.measureText(author).width
    ctx.restore()
    return authorWidth
  }

  get getTimeWithPrefix() {
    const { headerTimeFormat, headerTimePrefix } = this.header
    const formatDateString = formatDateTime(new Date(), headerTimeFormat)
    return `${headerTimePrefix} ${formatDateString}`
  }

  get calculateTimeWithPrefixWidth() {
    const { headerTimeFontColor, headerTimeFontSize, headerTimeFontWeight, headerTimeFontFamilyIndex } = this.header

    const prefixTimeString = this.getTimeWithPrefix
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = headerTimeFontColor
    ctx.font = this.setupFont(headerTimeFontWeight, headerTimeFontSize, headerTimeFontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    const timeWithPrefixWidth = ctx.measureText(prefixTimeString).width
    ctx.restore()
    return timeWithPrefixWidth
  }

  get calculateSloganWidth() {
    const { slogan, sloganFontSize, sloganFontColor, sloganFontWeight, sloganFontFamilyIndex } = this.footer

    const { ctx } = this
    ctx.save()
    ctx.fillStyle = sloganFontColor
    ctx.font = this.setupFont(sloganFontWeight, sloganFontSize, sloganFontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    const timeWithPrefixWidth = ctx.measureText(slogan).width
    ctx.restore()
    return timeWithPrefixWidth
  }

  calculateContentTotalLine() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.font = this.setupFont(this.fontWeight, this.fontSize, this.fontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    let words = this.content.split(' ')
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      const str = words.slice(0, idx).join(' ')
      const w = ctx.measureText(str).width
      if (w > this.maxLineWidth) {
        if (idx === 1) {
          idx = 2
        }
        this.setLineWidthMap(currentLine, ctx.measureText(words.slice(0, idx - 1).join(' ')).width)
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    this.setLineWidthMap(currentLine, ctx.measureText(words.join(' ')).width)
    return currentLine + 1
  }

  setupFont(fontWeight, fontSize, familyIndex) {
    return `${fontWeight} ${fontSize}px ${this.fontFamilys[familyIndex]},${
      this.fontFamilys[this.fallbackFontFamilyIndex]
    },sans-serif`
  }

  async drawing() {
    this.barWatcher.setTotal(6)
    this.barWatcher.update(5, {
      step: '绘制主体中'
    })
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.font = this.setupFont(this.fontWeight, this.fontSize, this.fontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    let words = this.content.split(' ')
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      const str = words.slice(0, idx).join(' ')
      const w = ctx.measureText(str).width
      if (w > this.maxLineWidth) {
        if (idx === 1) {
          idx = 2
        }
        ctx.fillText(
          words.slice(0, idx - 1).join(' '),
          this.x,
          this.headerHeight + this.y + (this.fontSize + this.lineGap) * currentLine
        )
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    if (idx > 0) {
      ctx.fillText(words.join(' '), this.x, this.headerHeight + this.y + (this.fontSize + this.lineGap) * currentLine)
    }
    return this
  }

  async drawAvatar() {
    this.barWatcher.setTotal(4)
    this.barWatcher.update(3, {
      step: '绘制头像中'
    })
    const { headerAvatarBorderWidth, headerAvatarBorderColor, avatarRadius, avatarCenterPointX, avatarCenterPointY } =
      this.headerCpu.calculateApplyAvatar
    const { ctx, avatar: avatarSrc } = this
    const avatar = await loadImage(avatarSrc)
    ctx.save()
    ctx.beginPath()
    ctx.arc(avatarCenterPointX, avatarCenterPointY, avatarRadius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(
      avatar,
      avatarCenterPointX - avatarRadius,
      avatarCenterPointY - avatarRadius,
      avatarRadius * 2,
      avatarRadius * 2
    )
    ctx.restore()

    // draw avatar border
    if (headerAvatarBorderWidth) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(avatarCenterPointX, avatarCenterPointY, avatarRadius + headerAvatarBorderWidth / 2, 0, Math.PI * 2)
      ctx.lineWidth = headerAvatarBorderWidth
      ctx.strokeStyle = headerAvatarBorderColor
      ctx.stroke()
      ctx.restore()
    }

    return this
  }

  async drawTime() {
    const {
      showHeaderTime,
      headerTimeFontSize,
      headerTimeFontWeight,
      headerTimeFontColor,
      headerTimeFontFamilyIndex,
      timeStartPointX,
      timeStartPointY
    } = this.headerCpu.calculateApplyTime
    const {
      showHeaderTimeIcon,
      timeIconStartPointX,
      timeIconStartPointY,
      timeIconWidth,
      timeIconHeight,
      headerTimeIcon
    } = this.headerCpu.calculateApplyTimeIcon

    if (showHeaderTime) {
      const { ctx } = this
      ctx.save()
      this.barWatcher.setTotal(6)
      this.barWatcher.update(5, {
        step: '绘制创建时间中'
      })
      ctx.beginPath()
      if (showHeaderTimeIcon) {
        const clock = await loadImage(headerTimeIcon)
        ctx.drawImage(clock, timeIconStartPointX, timeIconStartPointY, timeIconWidth, timeIconHeight)
      }
      ctx.fillStyle = headerTimeFontColor
      ctx.font = this.setupFont(headerTimeFontWeight, headerTimeFontSize, headerTimeFontFamilyIndex)
      ctx.textBaseline = this.textBaseline
      ctx.textAlign = this.textAlign
      ctx.fillText(this.getTimeWithPrefix, timeStartPointX, timeStartPointY)
      ctx.restore()
    }
    return this
  }

  async drawAuthor() {
    const {
      showHeaderAuthor,
      headerAuthorFontSize,
      headerAuthorFontWeight,
      authorStartPointX,
      authorStartPointY,
      headerAuthorFontColor,
      headAuthorFontFamilyIndex
    } = this.headerCpu.calculateApplyAuthor
    if (showHeaderAuthor) {
      this.barWatcher.setTotal(5)
      this.barWatcher.update(4, {
        step: '绘制作者中'
      })
      const { ctx, author } = this
      ctx.beginPath()
      ctx.fillStyle = headerAuthorFontColor
      ctx.font = this.setupFont(headerAuthorFontWeight, headerAuthorFontSize, headAuthorFontFamilyIndex)
      ctx.textBaseline = this.textBaseline
      ctx.textAlign = this.textAlign
      ctx.fillText(author, authorStartPointX, authorStartPointY)
    }
    return this
  }

  getMaxLineWidth() {
    let max = 1
    let maxLineWidth = this.lineWidthMap.get(1)
    for (const [line, width] of this.lineWidthMap.entries()) {
      if (width > maxLineWidth) {
        // eslint-disable-next-line no-unused-vars
        max = line
        maxLineWidth = width
      }
    }
    return Math.ceil(maxLineWidth)
  }

  setLineWidthMap(line, width) {
    this.lineWidthMap.set(line + 1, width)
  }

  setSuitableXWidth(maxLineWidth, targetWidth, x) {
    const calculateHalfWidth = (targetWidth - maxLineWidth) / 2
    return calculateHalfWidth > x ? calculateHalfWidth : x
  }

  get generateOutputName() {
    const { outputName } = this.anyPhotoConfig
    return `${outputName}`
  }

  async generatePng() {
    const base64img = this.canvas.toDataURL()
    const { outputDirPath, outputName } = this.anyPhotoConfig
    base64Img.img(base64img, outputDirPath, outputName, (error, filepath) => {
      if (error) {
        console.log(error.message)
      } else {
        this.barWatcher.update(7, {
          step: '绘制完成'
        })
        this.barWatcher.stop()
      }
    })
  }

  // todo如何避免重复代码
  async drawDivider() {
    const { ctx } = this
    const headerDivider = this.getValidDividerProperty(this.header, 'header')
    const footerDivider = this.getValidDividerProperty(this.footer, 'footer')
    const {
      showDivider: showHeaderDivider,
      strokeStyle: headerDividerStrokeStyle,
      moveTo: headerDividerMoveTo,
      lineTo: headerDividerLineTo
    } = headerDivider
    const {
      showDivider: showFooterDivider,
      strokeStyle: footerDividerStrokeStyle,
      moveTo: footerDividerMoveTo,
      lineTo: footerDividerLineTo
    } = footerDivider
    if (showHeaderDivider) {
      ctx.save()
      ctx.strokeStyle = headerDividerStrokeStyle
      ctx.moveTo(headerDividerMoveTo.x, headerDividerMoveTo.y)
      ctx.lineTo(headerDividerLineTo.x, headerDividerLineTo.y)
      ctx.stroke()
      ctx.restore()
    }
    if (showFooterDivider) {
      ctx.save()
      ctx.strokeStyle = footerDividerStrokeStyle
      ctx.moveTo(footerDividerMoveTo.x, footerDividerMoveTo.y)
      ctx.lineTo(footerDividerLineTo.x, footerDividerLineTo.y)
      ctx.stroke()
      ctx.restore()
    }

    return this
  }

  getValidDividerProperty(positionProvider, position) {
    const { x, color: contentColor, width } = this
    const applyDividerProperty = {
      header: {
        contentWidth: {
          moveTo: {
            x,
            y: this.headerHeight
          },
          lineTo: {
            x: width - x,
            y: this.headerHeight
          }
        },
        fullWidth: {
          moveTo: {
            x: 0,
            y: this.headerHeight
          },
          lineTo: {
            x: width,
            y: this.headerHeight
          }
        }
      },
      footer: {
        contentWidth: {
          moveTo: {
            x,
            y: this.headerHeight + this.contentHeight
          },
          lineTo: {
            x: width - x,
            y: this.headerHeight + this.contentHeight
          }
        },
        fullWidth: {
          moveTo: {
            x: 0,
            y: this.headerHeight + this.contentHeight
          },
          lineTo: {
            x: width,
            y: this.headerHeight + this.contentHeight
          }
        }
      }
    }
    // todo消除魔法字符串，判断颜色合格
    const positionDivider = { showDivider: false }
    const { divider } = positionProvider
    const contentWidth = 'contentWidth'
    const fullWidth = 'fullWidth'
    const validDividerSize = [contentWidth, fullWidth]
    if (divider) {
      const { size, color } = divider
      const applySize = validDividerSize.includes(size) ? size : validDividerSize[0]
      if (applySize === contentWidth) {
        positionDivider.showDivider = true
        positionDivider.strokeStyle = color || contentColor
        positionDivider.moveTo = applyDividerProperty[position][contentWidth].moveTo
        positionDivider.lineTo = applyDividerProperty[position][contentWidth].lineTo
      }
      if (applySize === fullWidth) {
        positionDivider.showDivider = true
        positionDivider.strokeStyle = color || contentColor
        positionDivider.moveTo = applyDividerProperty[position][fullWidth].moveTo
        positionDivider.lineTo = applyDividerProperty[position][fullWidth].lineTo
      }
      return positionDivider
    } else {
      return positionDivider
    }
  }

  async drawBackground() {
    const { ctx, width } = this
    ctx.save()
    const canvasBackgroundImage = await loadImage('/Users/weirui05/Desktop/pexels-bob-clark-21492.jpg')
    const canvasWidth = width
    const canvasHeight = this.headerHeight + this.contentHeight
    const { width: canvasBackgroundImageWidth, height: canvasBackgroundImageHeight } = canvasBackgroundImage
    const scaleX = canvasWidth / canvasBackgroundImageWidth
    const scaleY = canvasHeight / canvasBackgroundImageHeight
    const scale = Math.min(scaleX, scaleY)

    const offsetX = (canvasWidth - canvasBackgroundImageWidth * scale) / 2
    const offsetY = (canvasHeight - canvasBackgroundImageHeight * scale) / 2
    ctx.drawImage(
      canvasBackgroundImage,
      offsetX,
      offsetY,
      canvasBackgroundImageWidth * scale,
      canvasBackgroundImageHeight * scale
    )
    ctx.restore()
    return this
  }

  async drawFooter() {
    const {
      slogan,
      sloganFontSize,
      sloganFontColor,
      sloganFontWeight,
      sloganFontFamilyIndex,
      sloganStartPointX,
      sloganStartPointY
    } = this.footerCpu.calculateApplySlogan
    this.barWatcher.setTotal(7)
    this.barWatcher.update(6, {
      step: '绘制口号中'
    })
    const { ctx } = this
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = sloganFontColor
    ctx.font = this.setupFont(sloganFontWeight, sloganFontSize, sloganFontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    ctx.fillText(slogan, sloganStartPointX, sloganStartPointY)
    const { showQrCode, qrCodeSrc, qrCodeStartPointX, qrCodeStartPointY, qrCodeWidth } =
      this.footerCpu.calculateApplyQrCode
    if (showQrCode) {
      const qrCodeImage = await loadImage(qrCodeSrc)
      ctx.drawImage(qrCodeImage, qrCodeStartPointX, qrCodeStartPointY, qrCodeWidth, qrCodeWidth)
    }
    ctx.restore()
    return this
  }
}

const draw = ({ content, anyPhotoConfig }) => {
  const drawer = new Drawer({ content, anyPhotoConfig })
  drawer
    .setupCpu()
    .then(drawer => drawer.setupCanvas())
    // .then(drawer => drawer.drawBackground())
    .then(drawer => drawer.drawAvatar())
    .then(drawer => drawer.drawAuthor())
    .then(drawer => drawer.drawTime())
    .then(drawer => drawer.drawing())
    .then(drawer => drawer.setupFrom())
    .then(drawer => drawer.drawDivider())
    .then(drawer => drawer.drawFooter())
    .then(drawer => drawer.generatePng())
}

module.exports = draw
