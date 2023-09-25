const defaultCanvasSetting = {
  width: 640, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#003300', // #1b1c1f
  color: '#FFCC66', // #FFFFCC
  fontWeight: 'bold',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 15,
  fontSizeIndex: 4,
  x: 20,
  y: 20,

  header: {
    headerAlign: 'center', // left / center / right
    headerPaddingTop: 30,
    headerPaddingBottom: 30,
    // avatar
    headerAvatarSize: 80,
    headerAvatarBorderWidth: 4, // 应该要最大10，否则影响布局
    headerAvatarBorderColor: '#FFCC00',
    headerAvatarMarginBottom: 20,

    // author
    showHeaderAuthor: true,
    headerAuthorFontSize: 30,
    headerAuthorFontColor: '#FFCC66',
    headerAuthorFontWeight: 'bold',
    headAuthorFontSizeIndex: 4,
    headerAuthorMarginBottom: 5,

    // createTime
    showHeaderTime: true,
    headerTimeFontSize: 20,
    headerTimeFontColor: '#FFCC66',
    headerTimeFontWeight: 'medium',
    headerTimeFontSizeIndex: 4,
    headerTime: new Date(),
    headerTimeFormat: 'YYYY/MM/DD HH:mm:ss',
    headerTimePrefix: 'milestone on',
    // todo isImageUrl fn is error
    headerTimeIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f389.png',
    headerTimeIconGap: 12

    // headerDivider
    // divider: {
    //   size: 'contentWidth',
    //   color: '#ffffff'
    // }
  },
  footer: {
    // footerDivider
    // divider: {
    //   size: 'contentWidth',
    //   color: '#ffffff'
    // }
  }
}

module.exports = {
  defaultCanvasSetting
}
