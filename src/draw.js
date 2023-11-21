const { createCanvas, registerFont, loadImage, deregisterAllFonts } = require('canvas')
const { barWatcher, formatDateTime, colorTip, color } = require('./util')
const HeaderCpu = require('./headerCpu')
const FooterCpu = require('./footerCpu')
const UnderLineCpu = require('./underlineCpu')
const ResourceChecker = require('./resourceChecker')
const base64Img = require('base64-img')
const { defaultSeparator } = require('./config')

class Drawer {
  constructor({ content, anyPhotoConfig }) {
    const {
      width,
      x,
      y,
      fontFamilys,
      customFontPath,
      color,
      backgroundColor,
      fontSize,
      fontWeight,
      lineGap,
      textBaseline,
      textAlign,
      fontFamilyIndex,
      header,
      footer,
      from,
      underline
    } = anyPhotoConfig.canvasSetting
    deregisterAllFonts()
    if (customFontPath) {
      registerFont(customFontPath, {
        family: 'Custom'
      })
    }
    this.anyPhotoConfig = anyPhotoConfig
    // separator
    this.separator = this.anyPhotoConfig.separator
    this.width = width
    this.fontWeight = fontWeight
    this.fontFamilys = fontFamilys
    this.letterSpaceSeparator = '' // It may be useful in the future to control the spacing of content
    this.color = color
    this.backgroundColor = backgroundColor
    this.maxLineWidth = width - x * 2 // Here we just preset the maximum width, that is, use width - x * 2. You need it first to calculate the layout and the actual width of each line drawn.
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
    this.lineKeywordIdentifier = {}
    this.lineContent = {}
    this.totalLineNumber = this.calculateContentTotalLine
    this.compareHeight = 0
    const maxLineWidth = this.getMaxLineWidth
    this.x = this.lineWidthMap.size > 1 ? this.setSuitableXWidth(maxLineWidth, this.width, x) : x
    // header
    this.header = header
    this.title = this.anyPhotoConfig.title
    this.avatar = this.anyPhotoConfig.avatar
    this.headerHeight = 0
    // from
    this.from = from
    // footer
    this.footer = footer
    // underline
    this.underline = underline
  }

  async setupCpu() {
    const {
      from = {},
      ctx,
      barWatcher,
      fontSize,
      lineGap,
      totalLineNumber,
      x,
      y,
      header,
      footer,
      width,
      calculateTitleWidth,
      getDescriptionWidth,
      calculateSloganWidth
    } = this
    const { showFrom, fromFontSize, fromMarginTop } = from
    // DONE STEP1
    barWatcher.start(5, 1, { step: 'Initializing' })
    this.compareHeight = fontSize >= lineGap ? lineGap / 2 : fontSize / 2
    this.contentHeight = (totalLineNumber - 1) * lineGap + totalLineNumber * fontSize + y * 2 + this.compareHeight
    if (showFrom) {
      this.contentHeight = this.contentHeight + fromFontSize + fromMarginTop
    }
    ctx.save()
    this.headerCpu = new HeaderCpu({
      x,
      canvasHeaderSetting: header,
      canvasWidth: width,
      titleWidth: calculateTitleWidth,
      descriptionWidth: getDescriptionWidth
    })
    this.headerHeight = this.headerCpu.getHeaderHeight
    this.height = this.headerHeight + this.contentHeight

    this.footerCpu = new FooterCpu({
      x,
      canvasFooterSetting: footer,
      canvasWidth: width,
      headerHeight: this.headerHeight,
      contentHeight: this.contentHeight,
      sloganWidth: calculateSloganWidth
    })
    this.footerHeight = this.footerCpu.getFooterHeight
    this.height = this.height + this.footerHeight
    this.canvas = createCanvas(width, this.height)
    this.ctx = this.canvas.getContext('2d')
    return this
  }

  async drawFrom() {
    const { y, ctx, x, from = {}, headerHeight, contentHeight, compareHeight } = this
    const { showFrom, name, fromFontSize, fromFontColor, fromFontWeight, fromFontFamilyIndex } = from
    if (showFrom) {
      ctx.save()
      ctx.fillStyle = fromFontColor
      ctx.font = this.setupFont(fromFontWeight, fromFontSize, fromFontFamilyIndex)
      ctx.textBaseline = this.textBaseline
      ctx.textAlign = this.textAlign
      ctx.fillText(name, x, headerHeight + contentHeight - fromFontSize - y - compareHeight)
      ctx.restore()
    }
    return this
  }

  async setupCanvas() {
    const { ctx, barWatcher, width, height, backgroundColor, textBaseline, textAlign } = this
    ctx.textBaseline = textBaseline
    ctx.textAlign = textAlign
    // DONE STEP2
    barWatcher.setTotal(3)
    barWatcher.update(2, {
      step: 'Set up canvas'
    })
    ctx.beginPath()
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    return this
  }

  async drawAvatar() {
    const { ctx, avatar: avatarSrc, barWatcher, headerCpu } = this
    // DONE STEP3
    barWatcher.setTotal(4)
    barWatcher.update(3, {
      step: 'Drawing Avatar'
    })
    const { headerAvatarBorderWidth, headerAvatarBorderColor, avatarRadius, avatarCenterPointX, avatarCenterPointY } =
      headerCpu.calculateApplyAvatar
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

  async drawTitle() {
    const { ctx, title, headerCpu, barWatcher } = this
    const {
      showHeaderTitle,
      headerTitleFontSize,
      headerTitleFontWeight,
      titleStartPointX,
      titleStartPointY,
      headerTitleFontColor,
      headerTitleFontFamilyIndex
    } = headerCpu.calculateApplyTitle
    if (showHeaderTitle) {
      // DONE STEP4
      barWatcher.setTotal(5)
      barWatcher.update(4, {
        step: 'Drawing Title'
      })
      ctx.beginPath()
      ctx.fillStyle = headerTitleFontColor
      ctx.font = this.setupFont(headerTitleFontWeight, headerTitleFontSize, headerTitleFontFamilyIndex)
      ctx.fillText(title, titleStartPointX, titleStartPointY)
    }
    return this
  }

  async drawDescription() {
    const { ctx, headerCpu, barWatcher, getDescription } = this
    const {
      showHeaderDescription,
      headerDescriptionFontSize,
      headerDescriptionFontWeight,
      headerDescriptionFontColor,
      headerDescriptionFontFamilyIndex,
      descriptionStartPointX,
      descriptionStartPointY
    } = headerCpu.calculateApplyDescription
    const {
      showDescriptionIcon,
      descriptionIconStartPointX,
      descriptionIconStartPointY,
      descriptionIconWidth,
      descriptionIconHeight,
      headerDescriptionPrefixIcon
    } = headerCpu.calculateApplyDescriptionIcon

    if (showHeaderDescription) {
      ctx.save()
      // DONE STEP5
      barWatcher.setTotal(6)
      barWatcher.update(5, {
        step: 'Drawing Description'
      })
      ctx.beginPath()
      if (showDescriptionIcon) {
        const clock = await loadImage(headerDescriptionPrefixIcon)
        ctx.drawImage(
          clock,
          descriptionIconStartPointX,
          descriptionIconStartPointY,
          descriptionIconWidth,
          descriptionIconHeight
        )
      }
      ctx.fillStyle = headerDescriptionFontColor
      ctx.font = this.setupFont(
        headerDescriptionFontWeight,
        headerDescriptionFontSize,
        headerDescriptionFontFamilyIndex
      )
      ctx.fillText(getDescription, descriptionStartPointX, descriptionStartPointY)
      ctx.restore()
    }
    return this
  }

  async drawContent() {
    const {
      separator: usedSeparator,
      ctx,
      x,
      headerHeight,
      y,
      barWatcher,
      lineGap,
      color,
      fontWeight,
      fontSize,
      fontFamilyIndex,
      maxLineWidth
    } = this
    // DONE STEP6
    barWatcher.setTotal(7)
    barWatcher.update(6, {
      step: 'Drawing Content'
    })
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.font = this.setupFont(fontWeight, fontSize, fontFamilyIndex)
    const separator = usedSeparator === defaultSeparator ? ' ' : ''
    let words = this.content.split(separator)
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      const str = words.slice(0, idx).join(separator).replace(/[{}]/g, '')
      const w = ctx.measureText(str).width
      if (w > maxLineWidth) {
        if (idx === 1) {
          idx = 2
        }
        ctx.fillText(
          words
            .slice(0, idx - 1)
            .join(separator)
            .replace(/[{}]/g, ''),
          x,
          headerHeight + y + (fontSize + lineGap) * currentLine
        )
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    if (idx > 0) {
      ctx.fillText(words.join(separator).replace(/[{}]/g, ''), x, headerHeight + y + (fontSize + lineGap) * currentLine)
    }
    return this
  }

  async drawFooter() {
    const { ctx, footerCpu, barWatcher } = this
    const {
      slogan,
      sloganFontSize,
      sloganFontColor,
      sloganFontWeight,
      sloganFontFamilyIndex,
      sloganStartPointX,
      sloganStartPointY
    } = footerCpu.calculateApplySlogan
    // DONE STEP7
    barWatcher.setTotal(8)
    barWatcher.update(7, {
      step: 'Drawing Slogan'
    })
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = sloganFontColor
    ctx.font = this.setupFont(sloganFontWeight, sloganFontSize, sloganFontFamilyIndex)
    ctx.textBaseline = this.textBaseline
    ctx.textAlign = this.textAlign
    ctx.fillText(slogan, sloganStartPointX, sloganStartPointY)
    const { showSloganIcon, sloganIcon, sloganIconStartPointX, sloganIconStartPointY, sloganIconWidth } =
      this.footerCpu.calculateApplySloganIcon
    if (showSloganIcon) {
      const sloganIconImage = await loadImage(sloganIcon)
      ctx.drawImage(sloganIconImage, sloganIconStartPointX, sloganIconStartPointY, sloganIconWidth, sloganIconWidth)
    }
    ctx.restore()
    return this
  }

  async drawDivider() {
    const { ctx, header, footer } = this
    const headerDivider = this.getValidDividerProperty(header, 'header')
    const footerDivider = this.getValidDividerProperty(footer, 'footer')
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
      // DONE STEP8
      barWatcher.setTotal(9)
      barWatcher.update(8, {
        step: 'Drawing Header Divider'
      })
      ctx.save()
      ctx.strokeStyle = headerDividerStrokeStyle
      ctx.lineWidth = 1
      ctx.moveTo(headerDividerMoveTo.x, headerDividerMoveTo.y)
      ctx.lineTo(headerDividerLineTo.x, headerDividerLineTo.y)
      ctx.stroke()
      ctx.restore()
    }
    if (showFooterDivider) {
      // DONE STEP9
      barWatcher.setTotal(10)
      barWatcher.update(9, {
        step: 'Drawing Footer Divider'
      })
      ctx.save()
      ctx.strokeStyle = footerDividerStrokeStyle
      ctx.moveTo(footerDividerMoveTo.x, footerDividerMoveTo.y)
      ctx.lineTo(footerDividerLineTo.x, footerDividerLineTo.y)
      ctx.stroke()
      ctx.restore()
    }

    return this
  }

  // Drawing background may be implemented in the next version
  async drawBackground() {
    const { ctx, width, headerHeight, contentHeight } = this
    ctx.save()
    const canvasBackgroundImage = await loadImage('')
    const canvasWidth = width
    const canvasHeight = headerHeight + contentHeight
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

  async drawUnderline() {
    const {
      ctx,
      x,
      y,
      underline,
      headerHeight,
      fontWeight,
      fontSize,
      fontFamilyIndex,
      textAlign,
      textBaseline,
      lineGap,
      lineKeywordIdentifier,
      lineContent
    } = this
    let allLineKeywordIdentifier = []
    // eslint-disable-next-line no-unused-vars
    for (const [line, keywordIdentifier] of Object.entries(lineKeywordIdentifier)) {
      allLineKeywordIdentifier = [...allLineKeywordIdentifier, ...keywordIdentifier]
    }
    if (allLineKeywordIdentifier.length === 0) return this
    // DONE STEP10
    barWatcher.setTotal(11)
    barWatcher.update(10, {
      step: 'Drawing Footer Divider'
    })
    const underlineCpu = new UnderLineCpu({
      lineKeywordIdentifier,
      lineContent,
      ctx,
      x,
      y,
      canvasUnderlineSetting: underline,
      headerHeight,
      fontStyle: this.setupFont(fontWeight, fontSize, fontFamilyIndex),
      textAlign,
      textBaseline,
      fontSize,
      lineGap
    })
    underlineCpu.underlineKeyWord()
    return this
  }

  async generatePng() {
    const { canvas, anyPhotoConfig, generateOutputName, barWatcher } = this
    const base64img = canvas.toDataURL()
    const { outputDir } = anyPhotoConfig
    return new Promise(resolve => {
      base64Img.img(base64img, outputDir, generateOutputName, (error, filepath) => {
        if (error) {
          console.error(error.message)
        } else {
          barWatcher.update(12, {
            step: '🎉 Congratulations! Drawing End,Enjoy It'
          })
          barWatcher.stop()
          // exec(`code ${filepath}`)
          colorTip(
            `\n${color('Successful!', 'green', 'bold')} now you can find photo at ${color(
              filepath,
              'green',
              'bold',
              'underline'
            )}\n`
          )
          resolve(filepath)
          // console.timeEnd('draw')
        }
      })
    })
  }

  get getMaxLineWidth() {
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

  get calculateTitleWidth() {
    const { title, ctx, header } = this
    const { headerTitleFontColor, headerTitleFontSize, headerTitleFontWeight, headerTitleFontFamilyIndex } = header
    ctx.save()
    ctx.fillStyle = headerTitleFontColor
    ctx.font = this.setupFont(headerTitleFontWeight, headerTitleFontSize, headerTitleFontFamilyIndex)
    const titleWidth = ctx.measureText(title).width
    ctx.restore()
    return titleWidth
  }

  get getDescription() {
    const { showHeaderDescriptionTime, headerDescriptionTimeFormat, headerDescriptionPrefix } = this.header
    const formatDateString = formatDateTime(new Date(), headerDescriptionTimeFormat)
    return showHeaderDescriptionTime ? `${headerDescriptionPrefix} ${formatDateString}` : `${headerDescriptionPrefix}`
  }

  get getDescriptionWidth() {
    const { ctx, getDescription, header } = this
    const {
      headerDescriptionFontColor,
      headerDescriptionFontSize,
      headerDescriptionFontWeight,
      headerDescriptionFontFamilyIndex
    } = header
    const description = getDescription
    ctx.save()
    ctx.fillStyle = headerDescriptionFontColor
    ctx.font = this.setupFont(headerDescriptionFontWeight, headerDescriptionFontSize, headerDescriptionFontFamilyIndex)
    const descriptionWidth = ctx.measureText(description).width
    ctx.restore()
    return descriptionWidth
  }

  get calculateSloganWidth() {
    const { ctx, footer } = this
    const { slogan, sloganFontSize, sloganFontColor, sloganFontWeight, sloganFontFamilyIndex } = footer
    ctx.save()
    ctx.fillStyle = sloganFontColor
    ctx.font = this.setupFont(sloganFontWeight, sloganFontSize, sloganFontFamilyIndex)
    const sloganWidth = ctx.measureText(slogan).width
    ctx.restore()
    return sloganWidth
  }

  get calculateContentTotalLine() {
    const { separator: usedSeparator, ctx, color, fontWeight, fontSize, fontFamilyIndex, maxLineWidth } = this
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.font = this.setupFont(fontWeight, fontSize, fontFamilyIndex)
    const separator = usedSeparator === defaultSeparator ? ' ' : ''
    let words = this.content.split(separator)
    let currentLine = 0
    let idx = 1
    while (words.length > 0 && idx <= words.length) {
      const str = words.slice(0, idx).join(separator).replace(/[{}]/g, '')
      const w = ctx.measureText(str).width
      if (w > maxLineWidth) {
        if (idx === 1) {
          idx = 2
        }
        this.setLineWidthMap(currentLine, ctx.measureText(words.slice(0, idx - 1).join(separator)).width)
        this.setLineKeywordIdentifier(currentLine, words.slice(0, idx - 1).join(separator))
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    this.setLineWidthMap(currentLine, ctx.measureText(words.join(separator)).width)
    this.setLineKeywordIdentifier(currentLine, words.join(separator))
    return currentLine + 1
  }

  get generateOutputName() {
    const { outputName, defaultOutputNameHandle } = this.anyPhotoConfig
    if (typeof defaultOutputNameHandle === 'function') {
      const handledOutputName = defaultOutputNameHandle(outputName)
      return typeof handledOutputName === 'string' ? handledOutputName : outputName
    } else {
      return outputName
    }
  }

  setupFont(fontWeight, fontSize, familyIndex) {
    const { fontFamilys } = this
    return `${fontWeight} ${fontSize}px ${fontFamilys[familyIndex]},sans-serif`
  }

  setLineWidthMap(line, width) {
    this.lineWidthMap.set(line + 1, width)
  }

  setLineKeywordIdentifier(line, content) {
    this.lineContent[line] = content
    const identifierPositions = []
    let index = content.indexOf('{')
    if (index === -1) {
      index = content.indexOf('}')
    }
    while (index !== -1) {
      if (content[index] === '{') {
        identifierPositions.push({ key: 'startIdentifier', index, content })
        index = content.indexOf('}', index + 1)
      } else if (content[index] === '}') {
        identifierPositions.push({ key: 'endIdentifier', index, content })
        index = content.indexOf('{', index + 1)
      }
    }
    this.lineKeywordIdentifier[line] = identifierPositions
  }

  setSuitableXWidth(maxLineWidth, targetWidth, x) {
    const calculateHalfWidth = (targetWidth - maxLineWidth) / 2
    return calculateHalfWidth > x ? calculateHalfWidth : x
  }

  getValidDividerProperty(positionProvider, position) {
    const { x, color: contentColor, width, headerHeight, contentHeight } = this
    const applyDividerProperty = {
      header: {
        contentWidth: {
          moveTo: {
            x,
            y: headerHeight
          },
          lineTo: {
            x: width - x,
            y: headerHeight
          }
        },
        fullWidth: {
          moveTo: {
            x: 0,
            y: headerHeight
          },
          lineTo: {
            x: width,
            y: headerHeight
          }
        }
      },
      footer: {
        contentWidth: {
          moveTo: {
            x,
            y: headerHeight + contentHeight
          },
          lineTo: {
            x: width - x,
            y: headerHeight + contentHeight
          }
        },
        fullWidth: {
          moveTo: {
            x: 0,
            y: headerHeight + contentHeight
          },
          lineTo: {
            x: width,
            y: headerHeight + contentHeight
          }
        }
      }
    }
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
}

const draw = async ({ content, anyPhotoConfig }) => {
  // console.time('draw')
  const resourceChecker = new ResourceChecker(anyPhotoConfig)
  const handledAnyPhotoConfig = await resourceChecker.check(anyPhotoConfig)
  const drawer = new Drawer({ content, anyPhotoConfig: handledAnyPhotoConfig })
  return (
    drawer
      .setupCpu()
      .then(drawer => drawer.setupCanvas())
      // .then(drawer => drawer.drawBackground())
      .then(drawer => drawer.drawAvatar())
      .then(drawer => drawer.drawTitle())
      .then(drawer => drawer.drawDescription())
      .then(drawer => drawer.drawContent())
      .then(drawer => drawer.drawUnderline())
      .then(drawer => drawer.drawFrom())
      .then(drawer => drawer.drawDivider())
      .then(drawer => drawer.drawFooter())
      .then(drawer => drawer.generatePng())
  )
}

module.exports = draw
