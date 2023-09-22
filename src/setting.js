const defaultCanvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: 'purple', // #1b1c1f
  color: '#ffffff', // #E4D3AE
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
    headerAvatarSize: 100,
    headerAvatarBorderWidth: 10,
    headerAvatarBorderColor: 'gold',
    headerShowAuthor: true,
    headerAuthorFontSize: 30,
    headerShowCreateTime: true,
    headerCreateTimePrefix: '摘录于'
  }
}

module.exports = {
  defaultCanvasSetting
}
