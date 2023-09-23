const defaultCanvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#003300', // #1b1c1f
  color: '#FFCC66', // #FFFFCC
  fontWeight: 'thin',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 10,
  fontSizeIndex: 4,
  x: 20,
  y: 30,
  header: {
    headerAlign: 'center', // left / center / right
    headerPaddingTop: 40,
    headerPaddingBottom: 40,
    // avatar
    headerAvatarSize: 100,
    headerAvatarBorderWidth: 4, // 应该要最大10，否则影响布局
    headerAvatarBorderColor: '#FFCC00',
    headerAvatarMarginBottom: 10,

    // author
    showHeaderAuthor: true,
    headerAuthorFontSize: 30,
    headerAuthorFontColor: '#FFCC66',
    headerAuthorFontWeight: 'bold',
    headAuthorFontSizeIndex: 4,
    headerAuthorMarginBottom: 20,

    // createTime
    showHeaderTime: true,
    headerTimeFontSize: 30,
    headerTimeFontColor: '#FFCC66',
    headerTimeFontWeight: 'medium',
    headerTimeFontSizeIndex: 4,
    headerTime: new Date(),
    headerTimeFormat: 'YYYY/MM/DD HH:mm:ss',
    headerTimePrefix: 'milestone on',
    // todo isImageUrl fn is error
    headerTimeIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f389.png',
    headerTimeIconGap: 12
  }
}

module.exports = {
  defaultCanvasSetting
}
