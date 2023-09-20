const { createCanvas, registerFont } = require('canvas')
const path = require('path')
const base64Img = require('base64-img')

const canvasSetting = {
  width: 750,
  englishFonts: ['San Francisco', 'Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  themeFillStyle: '#1b1c1f', // #1b1c1f
  fontFillStyle: '#E4D3AE', // #E4D3AE
  fontWeight: 'thin',
  textBaseline: 'top',
  fontSize: 40,
  lineGap: 20,
  x: 50,
  y: 50
}
class Drawer {
  constructor({ word, anyPhotoConfig }) {
    const { width, englishFonts, fontFillStyle, themeFillStyle, fontSize, fontWeight, lineGap, x, y, textBaseline } =
      canvasSetting
    this.width = width
    this.fontWeight = fontWeight
    this.englishFonts = englishFonts
    this.fontFillStyle = fontFillStyle
    this.themeFillStyle = themeFillStyle
    this.lineGap = lineGap
    this.fitWidth = width - x * 2 // 这里只是预设最大宽度，也就是用width - x * 2，需要先有它，才能计算出来布局，以及每行实际绘制的宽度
    this.fontSize = fontSize
    this.textBaseline = textBaseline
    this.y = y
    this.word = word
    this.anyPhotoConfig = anyPhotoConfig
    this.canvas = createCanvas(this.width, 1)
    this.ctx = this.canvas.getContext('2d')
    this.lineWidthMap = new Map()
    this.totalLineNumber = this.calculateWordTotalLine()
    const maxLineWidth = this.getMaxLineWidth()
    this.x = this.lineWidthMap.size > 1 ? this.setSuitableXWidth(maxLineWidth, this.width, x) : x

    this.contentHeight =
      (this.totalLineNumber - 1) * this.lineGap + this.totalLineNumber * this.fontSize + this.y * 2 + this.fontSize / 2
    this.height = this.contentHeight
    this.canvas = createCanvas(this.width, this.contentHeight)
    this.ctx = this.canvas.getContext('2d')
  }
  setTheme() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.themeFillStyle
    ctx.fillRect(0, 0, this.width, this.height)
    return this
  }
  calculateWordTotalLine() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.fontFillStyle
    ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.englishFonts[3]}`
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = 'start'
    let words = this.word.split(' ')
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      let str = words.slice(0, idx).join(' ')
      let w = ctx.measureText(str).width
      if (w > this.fitWidth) {
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
  drawing() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.fontFillStyle
    ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.englishFonts[3]}`
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = 'start'
    let words = this.word.split(' ')
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      let str = words.slice(0, idx).join(' ')
      let w = ctx.measureText(str).width
      if (w > this.fitWidth) {
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

const draw = ({ word, anyPhotoConfig }) => {
  const drawer = new Drawer({ word, anyPhotoConfig })
  drawer.setTheme().drawing().generatePng()
}

module.exports = draw
