const { createCanvas, registerFont, loadImage } = require('canvas')
const { barWatcher, formatDateTime, loadImage: loadCanvasImage } = require('./util')
const Cpu = require('./cpu')
const path = require('path')
const base64Img = require('base64-img')

class Drawer {
  constructor({ content, anyPhotoConfig }) {
    const {
      width,
      englishFonts,
      color,
      backgroundColor,
      fontSize,
      fontWeight,
      lineGap,
      x,
      y,
      textBaseline,
      textAlign,
      fontSizeIndex,
      header,
      footer
    } = anyPhotoConfig.canvasSetting
    this.anyPhotoConfig = anyPhotoConfig
    this.width = width
    this.fontWeight = fontWeight
    this.englishFonts = englishFonts
    this.color = color
    this.backgroundColor = backgroundColor
    this.maxLineWidth = width - x * 2 // 这里只是预设最大宽度，也就是用width - x * 2，需要先有它，才能计算出来布局，以及每行实际绘制的宽度
    this.fontSize = fontSize
    this.fontSizeIndex = fontSizeIndex
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
    const maxLineWidth = this.getMaxLineWidth()
    this.x = this.lineWidthMap.size > 1 ? this.setSuitableXWidth(maxLineWidth, this.width, x) : x

    // header
    this.header = header
    this.author = this.anyPhotoConfig.author
    this.headerHeight = 0

    // footer
    this.footer = footer
  }
  async setupCpu() {
    this.barWatcher.start(5, 1, { step: '初始化中' })
    const compareHeight = this.fontSize >= this.lineGap ? this.lineGap / 2 : this.fontSize / 2
    this.contentHeight =
      (this.totalLineNumber - 1) * this.lineGap + this.totalLineNumber * this.fontSize + this.y * 2 + compareHeight
    this.ctx.save()
    this.cpu = new Cpu({
      canvasHeaderSetting: this.header,
      x: this.x,
      canvasWidth: this.width,
      authorWidth: this.calculateAuthorWidth,
      timeWidthPrefixWidth: this.calculateTimeWithPrefixWidth
    })
    this.headerHeight = this.cpu.getHeaderHeight
    this.height = this.headerHeight + this.contentHeight
    this.canvas = createCanvas(this.width, this.height)
    this.ctx = this.canvas.getContext('2d')
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
    const { headerAuthorFontColor, headerAuthorFontSize, headerAuthorFontWeight, headAuthorFontSizeIndex } = this.header
    const { author } = this.anyPhotoConfig
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = headerAuthorFontColor
    ctx.font = `${headerAuthorFontWeight} ${headerAuthorFontSize}px ${this.englishFonts[headAuthorFontSizeIndex]}`
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    const authorWidth = ctx.measureText(author).width
    ctx.restore()
    return authorWidth
  }

  get getTimeWithPrefix() {
    const { headerTime, headerTimeFormat, headerTimePrefix } = this.header
    const formatDateString = formatDateTime(headerTime, headerTimeFormat)
    return `${headerTimePrefix} ${formatDateString}`
  }

  get calculateTimeWithPrefixWidth() {
    const { headerTimeFontColor, headerTimeFontSize, headerTimeFontWeight, headerTimeFontSizeIndex } = this.header

    const prefixTimeString = this.getTimeWithPrefix
    const { ctx } = this
    ctx.save()
    ctx.fillStyle = headerTimeFontColor
    ctx.font = `${headerTimeFontWeight} ${headerTimeFontSize}px ${this.englishFonts[headerTimeFontSizeIndex]}`
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    const timeWithPrefixWidth = ctx.measureText(prefixTimeString).width
    ctx.restore()
    return timeWithPrefixWidth
  }

  calculateContentTotalLine() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.englishFonts[this.fontSizeIndex]}`
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    let words = this.content.split(' ')
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      let str = words.slice(0, idx).join(' ')
      let w = ctx.measureText(str).width
      if (w > this.maxLineWidth) {
        if (idx == 1) {
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
  async drawing() {
    this.barWatcher.setTotal(6)
    this.barWatcher.update(5, {
      step: '绘制主体中'
    })
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.englishFonts[this.fontSizeIndex]}`
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    let words = this.content.split(' ')
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      let str = words.slice(0, idx).join(' ')
      let w = ctx.measureText(str).width
      if (w > this.maxLineWidth) {
        if (idx == 1) {
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
      this.cpu.calculateApplyAvatar
    const { ctx } = this
    // 绘制头像图片
    // https://aliossupload.newarray.vip/WechatIMG364.jpg
    const avatar = await loadImage('/Users/weirui05/Desktop/1a376f96e85b4edb6011a91f9.png')
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
      headerTimeFontSizeIndex,
      timeStartPointX,
      timeStartPointY
    } = this.cpu.calculateApplyTime
    const {
      showHeaderTimeIcon,
      timeIconStartPointX,
      timeIconStartPointY,
      timeIconWidth,
      timeIconHeight,
      headerTimeIcon
    } = this.cpu.calculateApplyTimeIcon

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
      ctx.font = `${headerTimeFontWeight} ${headerTimeFontSize}px ${this.englishFonts[headerTimeFontSizeIndex]}`
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
      headAuthorFontSizeIndex
    } = this.cpu.calculateApplyAuthor
    if (showHeaderAuthor) {
      this.barWatcher.setTotal(5)
      this.barWatcher.update(4, {
        step: '绘制作者中'
      })
      const { ctx, author } = this
      ctx.beginPath()
      ctx.fillStyle = headerAuthorFontColor
      ctx.font = `${headerAuthorFontWeight} ${headerAuthorFontSize}px ${this.englishFonts[headAuthorFontSizeIndex]}`
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

  async generatePng() {
    const base64img = this.canvas.toDataURL()
    const { output } = this.anyPhotoConfig
    const drawImgPath = path.join(process.cwd(), output)
    base64Img.img(base64img, drawImgPath, `anyphoto`, (error, filepath) => {
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
    let contentWidth = 'contentWidth'
    let fullWidth = 'fullWidth'
    const validDividerSize = [contentWidth, fullWidth]
    if (divider) {
      const { size, color } = divider
      let applySize = validDividerSize.includes(size) ? size : validDividerSize[0]
      if (applySize === contentWidth) {
        positionDivider.showDivider = true
        positionDivider.strokeStyle = color || contentColor
        positionDivider.moveTo = applyDividerProperty[position][contentWidth]['moveTo']
        positionDivider.lineTo = applyDividerProperty[position][contentWidth]['lineTo']
      }
      if (applySize === fullWidth) {
        positionDivider.showDivider = true
        positionDivider.strokeStyle = color || contentColor
        positionDivider.moveTo = applyDividerProperty[position][fullWidth]['moveTo']
        positionDivider.lineTo = applyDividerProperty[position][fullWidth]['lineTo']
      }
      return positionDivider
    } else {
      return positionDivider
    }
  }
  async drawBackground() {
    const { ctx, width } = this
    ctx.save()
    const canvasBackgroundImage = await loadCanvasImage('/Users/weirui05/Desktop/pexels-bob-clark-21492.jpg')
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
}

const draw = ({ content, anyPhotoConfig }) => {
  const drawer = new Drawer({ content, anyPhotoConfig })
  drawer
    .setupCpu()
    .then(drawer => drawer.setupCanvas())
    .then(drawer => drawer.drawBackground())
    .then(drawer => drawer.drawAvatar())
    .then(drawer => drawer.drawAuthor())
    .then(drawer => drawer.drawTime())
    .then(drawer => drawer.drawDivider())
    .then(drawer => drawer.drawing())
    .then(drawer => drawer.generatePng())
}

module.exports = draw
