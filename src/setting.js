const defaultCanvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#CCCC99', // #1b1c1f
  color: '#000000', // #E4D3AE
  fontWeight: 'thin',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 10,
  fontSizeIndex: 4,
  x: 40,
  y: 30,
  header: {
    headerAlign: 'center', // left / center / right
    headerPaddingTop: 40,
    headerPaddingBottom: 20,
    // avatar
    headerAvatarSize: 100,
    headerAvatarBorderWidth: 2, // 应该要最大10，否则影响布局
    headerAvatarBorderColor: '#FFCC00',
    headerAvatarMarginBottom: 10,

    // author
    showHeaderAuthor: true,
    headerAuthorFontSize: 30,
    headerAuthorFontColor: '#000000',
    headerAuthorFontWeight: 'bold',
    headAuthorFontSizeIndex: 4,
    headerAuthorMarginBottom: 0,

    // createTime
    showHeaderTime: true,
    headerTimeFontSize: 25,
    headerTimeFontColor: '#000000',
    headerTimeFontWeight: 'medium',
    headerTimeFontSizeIndex: 4,
    headerTimeMarginBottom: 10,
    headerTimeFormat: 'YYYY/MM/DD HH:mm:ss',
    headerTimePrefix: 'inspiration occurs on'
  }
}

module.exports = {
  defaultCanvasSetting
}
