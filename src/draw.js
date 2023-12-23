const { createCanvas, registerFont, loadImage, deregisterAllFonts } = require('canvas')
const Table = require('cli-table')
const { barWatcher, formatDateTime, colorTip, color, truncateString, validateColor } = require('./util')
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
      backgroundImageOffsetX,
      backgroundImageOffsetY,
      backgroundImage,
      backgroundColor,
      linearGradientStop,
      linearGradientDirection,
      backgroundLineSpacing,
      backgroundLineColor,
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
    this.content = content
    this.anyPhotoConfig = anyPhotoConfig
    this.clear = this.anyPhotoConfig.clear
    this.separator = this.anyPhotoConfig.separator
    this.width = width
    this.fontWeight = fontWeight
    this.fontFamilys = fontFamilys
    this.letterSpaceSeparator = '' // It may be useful in the future to control the spacing of content
    this.color = color
    this.backgroundImageOffsetX = backgroundImageOffsetX
    this.backgroundImageOffsetY = backgroundImageOffsetY
    this.backgroundImage = backgroundImage
    this.backgroundColor = backgroundColor
    this.linearGradientStop = linearGradientStop
    this.linearGradientDirection = linearGradientDirection
    this.backgroundLineSpacing = backgroundLineSpacing
    this.backgroundLineColor = backgroundLineColor
    this.maxLineWidth = width - x * 2 // Here we just preset the maximum width, that is, use width - x * 2. You need it first to calculate the layout and the actual width of each line drawn.
    this.fontSize = fontSize
    this.fontFamilyIndex = fontFamilyIndex
    this.barWatcher = this.setBarWatcher
    // content
    this.lineGap = lineGap
    this.textBaseline = textBaseline
    this.textAlign = textAlign
    this.y = y
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

  async setupTable() {
    const { separator, content, title, anyPhotoConfig, color, backgroundColor, width, clear } = this
    if (clear) return this
    const {
      canvasSetting: {
        header: { headerAlign },
        from: { name },
        footer: { slogan }
      }
    } = anyPhotoConfig
    const table = new Table({
      style: { head: ['green'] },
      head: [
        'separator',
        'header-align',
        'image-width',
        'title',
        'content',
        'background-color',
        'content-color',
        'from',
        'slogan'
      ],
      colWidths: [15, 15, 15, 20, 20, 20, 20, 20, 20]
    })
    table.push([
      separator,
      headerAlign,
      width,
      truncateString(title),
      truncateString(content),
      backgroundColor,
      color,
      truncateString(name),
      truncateString(slogan)
    ])

    console.log(`${table.toString()}\n`)

    return this
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
    const { ctx, barWatcher, width, height, backgroundColor, linearGradientStop, textBaseline, textAlign } = this
    let gradientController
    if (Array.isArray(backgroundColor)) {
      const directionPoint = this.getLinearGradientDirection
      const validLinearGradientStop = this.getValidLinearGradientStop(backgroundColor, linearGradientStop)
      gradientController = ctx.createLinearGradient(...directionPoint)
      const backgroundColorLength = backgroundColor.length
      if (validLinearGradientStop) {
        for (let i = 0; i < backgroundColorLength; i++) {
          gradientController.addColorStop(validLinearGradientStop[i], backgroundColor[i])
        }
      } else {
        const intervalSize = 1 / (backgroundColorLength - 1)
        for (let i = 0; i < backgroundColorLength; i++) {
          gradientController.addColorStop(i * intervalSize, backgroundColor[i])
        }
      }
    }

    ctx.textBaseline = textBaseline
    ctx.textAlign = textAlign
    // DONE STEP2
    barWatcher.setTotal(3)
    barWatcher.update(2, {
      step: 'Set up canvas'
    })
    ctx.beginPath()
    ctx.fillStyle = gradientController ?? backgroundColor
    ctx.fillRect(0, 0, width, height)
    return this
  }

  async drawAvatar() {
    const { ctx, avatar: avatarSrc, barWatcher, headerCpu } = this
    const {
      showHeaderAvatar,
      headerAvatarBorderWidth,
      headerAvatarBorderColor,
      avatarRadius,
      avatarCenterPointX,
      avatarCenterPointY
    } = headerCpu.calculateApplyAvatar
    if (!headerCpu.showHeader || !showHeaderAvatar) return this
    // DONE STEP3
    barWatcher.setTotal(4)
    barWatcher.update(3, {
      step: 'Drawing Avatar'
    })
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
    if (showHeaderTitle && headerCpu.showHeader) {
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

    if (headerCpu.showHeader && showHeaderDescription) {
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
    const { ctx, x, headerHeight, y, barWatcher, lineGap, color, fontWeight, fontSize, fontFamilyIndex, lineContent } =
      this
    // DONE STEP6
    barWatcher.setTotal(7)
    barWatcher.update(6, {
      step: 'Drawing Content'
    })
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.font = this.setupFont(fontWeight, fontSize, fontFamilyIndex)
    for (const [line, content] of Object.entries(lineContent)) {
      ctx.fillText(content.replace(/[{}]/g, ''), x, headerHeight + y + (fontSize + lineGap) * Number(line))
    }
    return this
  }

  async drawFooter() {
    const { ctx, footerCpu, barWatcher } = this
    const {
      showFooter,
      slogan,
      sloganFontSize,
      sloganFontColor,
      sloganFontWeight,
      sloganFontFamilyIndex,
      sloganStartPointX,
      sloganStartPointY
    } = footerCpu.calculateApplySlogan
    if (!showFooter) return this
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
    const {
      showSloganIcon,
      sloganIcon,
      sloganIconStartPointX,
      sloganIconStartPointY,
      sloganIconWidth,
      sloganIconHeight
    } = this.footerCpu.calculateApplySloganIcon
    if (showSloganIcon) {
      const sloganIconImage = await loadImage(sloganIcon)
      ctx.drawImage(sloganIconImage, sloganIconStartPointX, sloganIconStartPointY, sloganIconWidth, sloganIconHeight)
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

  async drawBackgroundLines() {
    const { ctx, backgroundLineSpacing, backgroundImage, backgroundLineColor } = this
    if (backgroundImage) return this
    if (
      typeof backgroundLineSpacing !== 'number' ||
      backgroundLineSpacing <= 0 ||
      !validateColor(backgroundLineColor)
    ) {
      return this
    }
    const { verticalPoints, horizontalPoints } = this.getBackgroundLinePoints(backgroundLineSpacing)
    ctx.save()
    for (const { startX, startY, endX, endY } of verticalPoints) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = backgroundLineColor
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
    for (const { startX, startY, endX, endY } of horizontalPoints) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = backgroundLineColor
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
    ctx.restore()
    return this
  }

  async drawBackground() {
    const { ctx, width: canvasWidth, height: canvasHeight, backgroundImage } = this
    let { backgroundImageOffsetX, backgroundImageOffsetY } = this
    if (!backgroundImage) return this
    backgroundImageOffsetX = typeof backgroundImageOffsetX === 'number' ? backgroundImageOffsetX : 0.5
    backgroundImageOffsetY = typeof backgroundImageOffsetY === 'number' ? backgroundImageOffsetY : 0.5
    const x = 0
    const y = 0
    const targetWidth = canvasWidth
    const targetHeight = canvasHeight
    const canvasBackgroundImage = await loadImage(backgroundImage)
    const { width: bgWidth, height: bgHeight } = canvasBackgroundImage
    ctx.save()
    const bgImageWidth = bgWidth
    const bgImageHeight = bgHeight
    const ratio = Math.min(targetWidth / bgImageWidth, targetHeight / bgImageHeight)
    let newWidth = bgImageWidth * ratio
    let newHeight = bgImageHeight * ratio
    let cropX
    let cropY
    let cropWidth
    let cropHeight
    let aspectRatio = 1

    if (newWidth < targetWidth) {
      aspectRatio = targetWidth / newWidth
    }
    if (Math.abs(aspectRatio - 1) < 1e-14 && newHeight < targetHeight) {
      aspectRatio = targetHeight / newHeight
    }
    newWidth *= aspectRatio
    newHeight *= aspectRatio

    cropWidth = bgImageWidth / (newWidth / targetWidth)
    cropHeight = bgImageHeight / (newHeight / targetHeight)

    cropX = (bgImageWidth - cropWidth) * backgroundImageOffsetX
    cropY = (bgImageHeight - cropHeight) * backgroundImageOffsetY

    cropX = Math.max(0, cropX)
    cropY = Math.max(0, cropY)
    cropWidth = Math.min(cropWidth, bgImageWidth)
    cropHeight = Math.min(cropHeight, bgImageHeight)

    ctx.drawImage(canvasBackgroundImage, cropX, cropY, cropWidth, cropHeight, x, y, targetWidth, targetHeight)
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

  get setBarWatcher() {
    const { clear } = this
    if (clear) {
      return {
        start() {},
        setTotal() {},
        update() {},
        stop() {}
      }
    }
    return barWatcher
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
    const separator = usedSeparator === defaultSeparator ? '' : ' '
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
        this.setLineKeywordIdentifier(currentLine, words.slice(0, idx - 1).join(separator))
        currentLine++
        words = words.splice(idx - 1)
        idx = 1
      } else {
        idx++
      }
    }
    this.setLineKeywordIdentifier(currentLine, words.join(separator))
    let splitLineContent = []
    for (const values of Object.values(this.lineContent)) {
      splitLineContent = [...splitLineContent, ...values.split(/\n/g)]
    }
    const newLineContent = {}
    for (let i = 0; i < splitLineContent.length; i++) {
      newLineContent[i] = splitLineContent[i]
    }
    const contentViewer = {}
    const padContent = originContent => {
      let content = originContent
      while (ctx.measureText(content).width < maxLineWidth) {
        content += ' '
      }
      return {
        content: content.replace(/(.*?)\s$/, '$1'),
        contentWidth: ctx.measureText(content.replace(/(.*?)\s$/, '$1')).width
      }
    }
    let totalLine = 0
    for (const [line, originContent] of Object.entries(newLineContent)) {
      totalLine = +line
      const { content, contentWidth } = padContent(originContent)
      contentViewer[line] = { content, contentWidth }
      this.setLineWidthMap(+line, contentWidth)
      this.setLineKeywordIdentifier(+line, content)
    }
    // console.log(contentViewer)
    return totalLine + 1
  }

  get getLinearGradientDirection() {
    const { linearGradientDirection = 'to right bottom', width, height } = this
    switch (linearGradientDirection) {
      case 'to left':
        return [width, 0, 0, 0]
      case 'to right':
        return [0, 0, width, 0]
      case 'to top':
        return [0, height, 0, 0]
      case 'to bottom':
        return [0, 0, 0, height]
      case 'to left top':
        return [width, height, 0, 0]
      case 'to right top':
        return [0, height, width, 0]
      case 'to right bottom':
        return [0, 0, width, height]
      case 'to left bottom':
        return [width, 0, 0, height]
      default:
        return [0, 0, width, height]
    }
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

  getValidLinearGradientStop(backgroundColor, linearGradientStop) {
    if (!Array.isArray(linearGradientStop)) return undefined
    if (backgroundColor.length !== linearGradientStop.length) return undefined
    const validStop = linearGradientStop.every(stop => typeof stop === 'number' && stop >= 0 && stop <= 1)
    if (!validStop) {
      return undefined
    }
    if (linearGradientStop.length !== [...new Set(linearGradientStop)].length) return undefined
    return linearGradientStop
  }

  getBackgroundLinePoints(backgroundLineSpacing) {
    const { width, height } = this
    const spacingVerticalRemainder = height % backgroundLineSpacing
    const spacingHorizontalRemainder = width % backgroundLineSpacing
    const verticalPoints = []
    const horizontalPoints = []
    let pointY = spacingVerticalRemainder === 0 ? backgroundLineSpacing : spacingVerticalRemainder / 2
    while (pointY < height) {
      verticalPoints.push({
        startX: 0,
        startY: pointY,
        endX: width,
        endY: pointY
      })
      pointY += backgroundLineSpacing
    }
    let pointX = spacingHorizontalRemainder === 0 ? backgroundLineSpacing : spacingHorizontalRemainder / 2
    while (pointX < width) {
      horizontalPoints.push({
        startX: pointX,
        startY: 0,
        endX: pointX,
        endY: height
      })
      pointX += backgroundLineSpacing
    }
    return {
      verticalPoints,
      horizontalPoints
    }
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
  const handledAnyPhotoConfig = await resourceChecker.check()
  // console.log(handledAnyPhotoConfig)
  const drawer = new Drawer({ content, anyPhotoConfig: handledAnyPhotoConfig })
  return drawer
    .setupTable()
    .then(drawer => drawer.setupCpu())
    .then(drawer => drawer.setupCanvas())
    .then(drawer => drawer.drawBackground())
    .then(drawer => drawer.drawBackgroundLines())
    .then(drawer => drawer.drawAvatar())
    .then(drawer => drawer.drawTitle())
    .then(drawer => drawer.drawDescription())
    .then(drawer => drawer.drawContent())
    .then(drawer => drawer.drawUnderline())
    .then(drawer => drawer.drawFrom())
    .then(drawer => drawer.drawDivider())
    .then(drawer => drawer.drawFooter())
    .then(drawer => drawer.generatePng())
}

module.exports = draw
