const { createCanvas, registerFont } = require('canvas')
const path = require('path')
const base64Img = require('base64-img')
class Drawer {
  constructor({ word, anyPhotoConfig }) {
    this.word = word
    this.anyPhotoConfig = anyPhotoConfig
    this.canvas = createCanvas(750, 1000)
    this.ctx = this.canvas.getContext('2d')
  }
  setTheme() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = `#333333`
    ctx.fillRect(0, 0, 750, 1000)
    return this
  }
  drawing() {
    const { ctx } = this
    ctx.beginPath()
    ctx.fillStyle = `white`
    ctx.font = '20px'
    ctx.fillText(this.word, 100, 200)
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
