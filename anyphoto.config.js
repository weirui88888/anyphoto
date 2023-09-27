const anyPhotoConfig = {
  defaultOutput: 'anyphoto',
  defaultAvatar: '/Users/weirui05/Desktop/WechatIMG38388.jpg',
  defaultAuthor: 'AnyPhoto',
  canvasSetting: {
    width: 750,
    fontFamilys: [
      'Arial',
      'Times New Roman',
      'Verdana',
      'Tahoma',
      'Courier New',
      'Helvetica',
      'Custom'
    ],
    customFontFamilyPath: '',
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
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#FFCC00',
      headerAvatarMarginBottom: 20,
      showHeaderAuthor: true,
      headerAuthorFontSize: 30,
      headerAuthorFontColor: '#FFCC66',
      headerAuthorFontWeight: 'bold',
      headAuthorFontFamilyIndex: 6,
      headerAuthorMarginBottom: 5,
      showHeaderTime: true,
      headerTimeFontSize: 20,
      headerTimeFontColor: '#FFCC66',
      headerTimeFontWeight: 'medium',
      headerTimeFontFamilyIndex: 6,
      headerTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerTimePrefix: 'milestone on',
      headerTimeIcon: '',
      headerTimeIconGap: 12
    },
    footer: {
      paddingY: 60,
      slogan: 'wechat reading',
      sloganPosition: 'left',
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
}
module.exports = anyPhotoConfig
