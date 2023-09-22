const defaultCanvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#339966', // #1b1c1f
  color: '#E4D3AE', // #E4D3AE
  fontWeight: 'thin',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 40,
  lineGap: 10,
  fontSizeIndex: 4,
  x: 40,
  y: 30,
  header: {
    headerAlign: 'center', // left / center / right
    headerPaddingTop: 30,
    headerPaddingBottom: 20,
    // avatar
    headerAvatarSize: 100,
    headerAvatarBorderWidth: 2, // 应该要最大10，否则影响布局
    headerAvatarBorderColor: '#FFCC00',
    headerAvatarMarginBottom: 10,

    // author
    showHeaderAuthor: true,
    headerAuthorFontSize: 30,
    headerAuthorFontColor: '#E4D3AE',
    headerAuthorFontWeight: 'medium',
    headAuthorFontSizeIndex: 4,
    headerAuthorMarginBottom: 10,

    headerShowCreateTime: true,
    headerCreateTimePrefix: '摘录于'
  }
}

module.exports = {
  defaultCanvasSetting
}
