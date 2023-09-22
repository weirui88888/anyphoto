const { createCanvas, registerFont, loadImage } = require('canvas')
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
      header
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
  }
  async setupCpu() {
    const compareHeight = this.fontSize >= this.lineGap ? this.lineGap / 2 : this.fontSize / 2
    this.contentHeight =
      (this.totalLineNumber - 1) * this.lineGap + this.totalLineNumber * this.fontSize + this.y * 2 + compareHeight
    this.ctx.save()
    this.cpu = new Cpu({
      canvasHeaderSetting: this.header,
      x: this.x,
      canvasWidth: this.width,
      authorWidth: this.calculateAuthorWidth()
    })
    this.height = this.contentHeight
    this.canvas = createCanvas(this.width, this.contentHeight)
    this.ctx = this.canvas.getContext('2d')
    return this
  }
  async setupCanvas() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.backgroundColor
    ctx.fillRect(0, 0, this.width, this.height)
    return this
  }
  // todo应该需要想个办法，去智能的判断字体的宽度，是否大于canvasWidth-2*x
  calculateAuthorWidth() {
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
  drawing() {
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
        ctx.fillText(words.slice(0, idx - 1).join(' '), this.x, this.y + (this.fontSize + this.lineGap) * currentLine)
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    if (idx > 0) {
      ctx.fillText(words.join(' '), this.x, this.y + (this.fontSize + this.lineGap) * currentLine)
    }
    return this
  }

  async drawAvatar() {
    const { headerAvatarBorderWidth, headerAvatarBorderColor, avatarRadius, avatarCenterPointX, avatarCenterPointY } =
      this.cpu.calculateApplyAvatar
    const { ctx } = this
    // 绘制头像图片
    const avatar = await loadImage('https://aliossupload.newarray.vip/WechatIMG39.png')
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
  drawAuthor() {
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
        console.log('成功啦')
      }
    })
  }
}

const draw = ({ content, anyPhotoConfig }) => {
  const drawer = new Drawer({ content, anyPhotoConfig })
  drawer
    .setupCpu()
    .then(drawer => drawer.setupCanvas())
    .then(drawer => drawer.drawing())
    .then(drawer => drawer.drawAvatar())
    .then(drawer => drawer.drawAuthor())
    .then(drawer => drawer.generatePng())
}

module.exports = draw
