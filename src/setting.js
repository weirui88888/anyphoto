const defaultCanvasSetting = {
  width: 750, // 通用的
  englishFonts: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica'],
  backgroundColor: '#006666', // #1b1c1f
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
    //   color: '#FFCC66'
    // }
  },
  footer: {
    // footerDivider
    // divider: {
    //   size: 'contentWidth',
    //   color: '#FFCC66'
    // },
    paddingY: 40,
    slogan: 'wechat reading',
    sloganPosition: 'left', // left || right
    sloganFontSize: 16,
    sloganFontColor: '#FFCC66',
    sloganFontWeight: 'bold',
    sloganFontSizeIndex: 4,
    qrCodeSrc: '/Users/weirui05/Desktop/WechatIMG374.jpg',
    qrCodePaddingY: 10
  },
  from: {
    showFrom: false,
    name: '/react and vue',
    fromFontSize: 16,
    fromFontColor: '#FFCC66',
    fromFontWeight: 'bold',
    frmFontSizeIndex: 4,
    fromMarginTop: 30
  }
}

module.exports = {
  defaultCanvasSetting
}
