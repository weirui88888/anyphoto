const defaultCanvasSetting = {
  width: 750,
  fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
  customFontFamilyPath: '/Users/weirui05/Desktop/Pacifico-Regular.ttf',
  fallbackFontFamilyIndex: 4,
  backgroundColor: '#006666',
  color: '#FFCC66',
  fontWeight: 'bold',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 15,
  fontFamilyIndex: 6,
  x: 20,
  y: 20,

  header: {
    headerAlign: 'center',
    headerPaddingTop: 30,
    headerPaddingBottom: 30,
    // avatar
    headerAvatarSize: 80,
    headerAvatarBorderWidth: 4,
    headerAvatarBorderColor: '#FFCC00',
    headerAvatarMarginBottom: 20,

    // author
    showHeaderAuthor: true,
    headerAuthorFontSize: 30,
    headerAuthorFontColor: '#FFCC66',
    headerAuthorFontWeight: 'bold',
    headAuthorFontFamilyIndex: 6,
    headerAuthorMarginBottom: 5,

    // createTime
    showHeaderTime: true,
    headerTimeFontSize: 20,
    headerTimeFontColor: '#FFCC66',
    headerTimeFontWeight: 'medium',
    headerTimeFontFamilyIndex: 6,
    headerTimeFormat: 'YYYY/MM/DD HH:mm:ss',
    headerTimePrefix: 'milestone on',
    headerTimeIcon: '',
    headerTimeIconGap: 12
    // divider: {
    //   size: 'contentWidth',
    //   color: '#FFCC66'
    // }
  },
  footer: {
    // divider: {
    //   size: 'contentWidth',
    //   color: '#FFCC66'
    // },
    paddingY: 60,
    slogan: 'wechat reading',
    sloganPosition: 'left', // left || right
    sloganFontSize: 16,
    sloganFontColor: '#FFCC66',
    sloganFontWeight: 'bold',
    sloganFontFamilyIndex: 6,
    qrCodeSrc: '',
    qrCodePaddingY: 10
  },
  from: {
    showFrom: false,
    name: '/react and vue',
    fromFontSize: 16,
    fromFontColor: '#FFCC66',
    fromFontWeight: 'bold',
    fromFontFamilyIndex: 6,
    fromMarginTop: 30
  }
}

module.exports = {
  defaultCanvasSetting
}
