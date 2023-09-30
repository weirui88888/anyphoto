const { colorTip } = require('./util')
class UnderLineCpu {
  constructor({
    lineKeywordIdentifier,
    lineContent,
    ctx,
    x,
    y,
    headerHeight,
    fontStyle,
    textAlign,
    textBaseline,
    fontSize,
    lineGap,
    canvasUnderlineSetting = {}
  }) {
    this.lineKeywordIdentifier = lineKeywordIdentifier
    this.lineContent = lineContent
    this.ctx = ctx
    this.x = x
    this.y = y
    this.fontStyle = fontStyle
    this.textAlign = textAlign
    this.textBaseline = textBaseline
    this.headerHeight = headerHeight
    this.fontSize = fontSize
    this.lineGap = lineGap
    this.canvasUnderlineSetting = {
      shape: 'line',
      color: '#fff',
      lineWidth: 3,
      offsetY: 10,
      ...canvasUnderlineSetting
    }
  }

  get getLineUnderlinePositionsIndex() {
    let identifierNumber = 0
    let identifiers = []
    for (const lineIdentifier of Object.values(this.lineKeywordIdentifier)) {
      identifierNumber += lineIdentifier.length
      identifiers = [...identifiers, ...lineIdentifier]
    }
    if (identifierNumber % 2 !== 0) {
      colorTip(
        '请设置正确的划线标识符，确保你提供的文案中，{与}是成对出现的且顺序不可反，否则你就是在为难我',
        'yellow',
        'bold'
      )
      return {
        shouldUnderline: false
      }
    } else {
      const lineUnderlineIndex = {}
      let finishUnderline = true
      for (const [line, lineIdentifiers] of Object.entries(this.lineKeywordIdentifier)) {
        lineUnderlineIndex[line] = []
        if (lineIdentifiers.length !== 0) {
          for (let i = 0; i < lineIdentifiers.length; i++) {
            const identifier = lineIdentifiers[i]
            const nextIdentifier = lineIdentifiers[i + 1]
            if (identifier.key === 'startIdentifier') {
              // 当其中的项目的key为splitStartIdentifier时，代表要往这一行中推入一个范围，起点为当前index,终点为下一个项目的index,如果没有，那么就是100
              const position = { content: identifier.content, underlineStart: identifier.index }
              if (nextIdentifier) {
                position.underlineEnd = nextIdentifier.index
                finishUnderline = true
              } else {
                position.underlineEnd = Infinity
                finishUnderline = false
              }
              lineUnderlineIndex[line].push(position)
            }
            if (identifier.key === 'endIdentifier' && identifier === lineIdentifiers[0]) {
              const position = { content: identifier.content, underlineStart: 0 }
              position.underlineEnd = identifier.index
              finishUnderline = true
              lineUnderlineIndex[line].push(position)
            }
          }
        } else {
          // 这一行没有标记，但是要看strokeEnd是不是为true,如果不为true,则代表上一行最后一个标识符是{(也就是没有闭合)
          !finishUnderline &&
            lineUnderlineIndex[line].push({
              underlineStart: 0,
              underlineEnd: Infinity,
              content: this.lineContent[line]
            })
        }
      }
      return {
        shouldUnderline: true,
        lineUnderlineIndex
      }
    }
  }

  getLineUnderlinePositions(lineUnderlineIndex) {
    const { ctx, x, headerHeight, y, fontSize, lineGap, canvasUnderlineSetting } = this
    const { offsetY } = canvasUnderlineSetting
    ctx.font = this.fontStyle
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    const underlinePositions = []
    for (const [line, lineUnderlinePositions] of Object.entries(lineUnderlineIndex)) {
      if (lineUnderlinePositions.length === 0) continue
      for (const { content, underlineStart, underlineEnd } of lineUnderlinePositions) {
        const underlineStartPointX = x + ctx.measureText(content.slice(0, underlineStart).replace(/[{}]/g, '')).width
        const underlineStartPointY = headerHeight + y + (fontSize + lineGap) * line + fontSize + offsetY
        const underlineEndPointX = x + ctx.measureText(content.slice(0, underlineEnd).replace(/[{}]/g, '')).width
        const underlineEndPointY = underlineStartPointY
        underlinePositions.push({ underlineStartPointX, underlineStartPointY, underlineEndPointX, underlineEndPointY })
      }
    }
    return underlinePositions
  }

  underlineKeyWord() {
    const { ctx, canvasUnderlineSetting } = this
    const { shape, color, lineWidth } = canvasUnderlineSetting
    const { shouldUnderline, lineUnderlineIndex } = this.getLineUnderlinePositionsIndex
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    if (shouldUnderline) {
      const underlinePositions = this.getLineUnderlinePositions(lineUnderlineIndex)
      for (const {
        underlineStartPointX,
        underlineStartPointY,
        underlineEndPointX,
        underlineEndPointY
      } of underlinePositions) {
        if (shape === 'line') {
          ctx.beginPath()
          ctx.moveTo(underlineStartPointX, underlineStartPointY)
          ctx.lineTo(underlineEndPointX, underlineEndPointY)
          ctx.stroke()
        }
        if (shape === 'wave') {
          this.underlineWaveKeyWord({
            underlineStartPointX,
            underlineStartPointY,
            underlineEndPointX,
            underlineEndPointY
          })
        }
      }
    }
  }

  underlineWaveKeyWord({ underlineStartPointX, underlineStartPointY, underlineEndPointX, underlineEndPointY }) {
    const { ctx, canvasUnderlineSetting } = this
    const {
      color,
      lineWidth,
      amplitude = 6, // 振幅，这个数字越大，振幅越大
      wavelength = 90 // 波长，这个数字越大，波长越小
    } = canvasUnderlineSetting
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth

    let counter = 0
    let x = underlineStartPointX
    let y = underlineStartPointY

    const increase = ((wavelength / 180) * Math.PI) / 9
    for (let i = underlineStartPointX; i <= underlineEndPointX; i += 1) {
      ctx.moveTo(x, y)
      x = i
      y = underlineStartPointY - Math.sin(counter) * amplitude
      counter += increase
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
}

module.exports = UnderLineCpu