const anyPhotoConfig = {
  defaultContent:
    'Generate personalized photos easily! Create your own unique style in just a few steps. Add avatar, date, author and QR code to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and let your photos tell a story!  #frontenddevelopment #personalizedphoto #creativetools',
  defaultOutputDirPath: 'anyphoto',
  defaultOutputName: 'anyphoto',
  defaultOutputNameHandle(defaultOutputName) {},
  defaultAvatar: '/Users/weirui05/Desktop/WechatIMG38388.jpg',
  defaultAuthor: 'AnyPhoto',
  canvasSetting: {
    width: 750,
    fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
    customFontFamilyPath: '/Users/weirui05/Desktop/Caveat-VariableFont_wght.ttf',
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
      headerTimePrefix: 'Nice to meet you at',
      headerTimeIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f308.png',
      headerTimeIconGap: 6,
      headerTimeIconOffsetY: 4
    },
    footer: {
      paddingY: 60,
      slogan: 'By AnyPhoto',
      sloganPosition: 'right',
      sloganFontSize: 20,
      sloganFontColor: '#FFCC66',
      sloganFontWeight: 'bold',
      sloganFontFamilyIndex: 6,
      qrCodeSrc: '',
      qrCodePaddingY: 10
    },
    from: {
      showFrom: true,
      name: '/ Let your photos tell a story',
      fromFontSize: 20,
      fromFontColor: '#FFCC66',
      fromFontWeight: 'bold',
      fromFontFamilyIndex: 6,
      fromMarginTop: 30
    },
    underline: {
      shape: 'wave',
      color: '#fff',
      lineWidth: 1,
      amplitude: 2,
      wavelength: 180,
      offsetY: 10
    }
  }
}
module.exports = anyPhotoConfig
