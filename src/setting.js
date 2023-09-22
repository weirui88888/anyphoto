const defaultCanvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#1b1c1f', // #1b1c1f
  color: '#E4D3AE', // #E4D3AE
  fontWeight: 'bold',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 20,
  fontSizeIndex: 2,
  x: 20,
  y: 30,
  header: {
    headerAlign: 'center', // left / center / right
    headerPaddingTop: 30,
    headerPaddingBottom: 20,
    // avatar
    headerAvatarSize: 100,
    headerAvatarBorderWidth: 5, // 应该要最大10，否则影响布局
    headerAvatarBorderColor: 'gold',
    headerAvatarMarginBottom: 10,

    // author
    headerShowAuthor: true,
    headerAuthorFontSize: 30,
    headerAuthorFontWeight: 'bold',
    headerAuthorMarginBottom: 10,

    headerShowCreateTime: true,
    headerCreateTimePrefix: '摘录于'
  }
}

module.exports = {
  defaultCanvasSetting
}
