const { createCanvas, registerFont } = require('canvas')
const path = require('path')
const base64Img = require('base64-img')

const canvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#1b1c1f', // #1b1c1f
  color: '#E4D3AE', // #E4D3AE
  fontWeight: 'bold',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 12,
  fontSizeIndex: 2,
  x: 20,
  y: 30
}
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
      fontSizeIndex
    } = canvasSetting
    this.width = width
    this.fontWeight = fontWeight
    this.englishFonts = englishFonts
    this.color = color
    this.backgroundColor = backgroundColor
    this.lineGap = lineGap
    this.maxLineWidth = width - x * 2 // 这里只是预设最大宽度，也就是用width - x * 2，需要先有它，才能计算出来布局，以及每行实际绘制的宽度
    this.fontSize = fontSize
    this.textBaseline = textBaseline
    this.textAlign = textAlign
    this.fontSizeIndex = fontSizeIndex
    this.y = y
    this.content = content
    this.anyPhotoConfig = anyPhotoConfig
    this.canvas = createCanvas(this.width, 1)
    this.ctx = this.canvas.getContext('2d')
    this.lineWidthMap = new Map()
    this.totalLineNumber = this.calculateContentTotalLine()
    const maxLineWidth = this.getMaxLineWidth()
    this.x = this.lineWidthMap.size > 1 ? this.setSuitableXWidth(maxLineWidth, this.width, x) : x
    // compare to use small height
    const compareHeight = this.fontSize >= this.lineGap ? this.lineGap / 2 : this.fontSize / 2
    this.contentHeight =
      (this.totalLineNumber - 1) * this.lineGap + this.totalLineNumber * this.fontSize + this.y * 2 + compareHeight
    this.height = this.contentHeight
    this.canvas = createCanvas(this.width, this.contentHeight)
    this.ctx = this.canvas.getContext('2d')
  }
  setCanvas() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.backgroundColor
    ctx.fillRect(0, 0, this.width, this.height)
    return this
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

  generatePng() {
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
  drawer.setCanvas().drawing().generatePng()
}

module.exports = draw
