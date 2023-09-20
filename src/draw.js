const { createCanvas, registerFont } = require('canvas')
const path = require('path')
const base64Img = require('base64-img')

const canvasSetting = {
  width: 750,
  height: 1000,
  englishFonts: ['San Francisco', 'Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  themeFillStyle: '#1b1c1f',
  fontFillStyle: '#E4D3AE',
  fontWeight: 'bold',
  fontSize: 30,
  lineGap: 10,
  lineHeight: 40,
  x: 50,
  y: 50,
  fitWidth: 650
}
class Drawer {
  constructor({ word, anyPhotoConfig }) {
    const { width, height, englishFonts, fontFillStyle, themeFillStyle, fontSize, lineHeight, x, y, fitWidth } =
      canvasSetting
    this.width = width
    this.height = height
    this.englishFonts = englishFonts
    this.fontFillStyle = fontFillStyle
    this.themeFillStyle = themeFillStyle
    this.lineHeight = lineHeight
    this.fitWidth = fitWidth
    this.fontSize = fontSize
    this.x = x
    this.y = y
    this.word = word
    this.anyPhotoConfig = anyPhotoConfig
    this.canvas = createCanvas(this.width, 1)
    this.ctx = this.canvas.getContext('2d')
    const totolline = this.calculateWordTotalLine()
    const mainheight = (totolline - 1) * 10 + totolline * 30 + 50
    this.height = mainheight
    this.canvas = createCanvas(this.width, mainheight)
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
    ctx.font = `bold ${this.fontSize}px ${this.englishFonts[1]}`
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
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    console.log('🌹 ~ file: draw.js:72 ~ Drawer ~ calculateWordTotalLine ~ currentLine:', currentLine)
    return currentLine + 1
  }
  drawing() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = this.fontFillStyle
    ctx.font = `bold ${this.fontSize}px ${this.englishFonts[1]}`
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
        const drawY = this.y + this.lineHeight * currentLine
        ctx.fillText(words.slice(0, idx - 1).join(' '), this.x, drawY)

        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    if (idx > 0) {
      ctx.fillText(words.join(' '), this.x, this.y + this.lineHeight * currentLine)
      console.log('🌹 ~ file: draw.js:100 ~ Drawer ~ drawing ~ currentLine:', currentLine)
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
