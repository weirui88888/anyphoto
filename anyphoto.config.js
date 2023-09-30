const { fontColor, backgroundColor } = require('./src/color')
const anyPhotoConfig = {
  defaultOutputDirPath: 'anyphoto',
  defaultOutputName: 'anyphoto',
  defaultOutputNameHandle(defaultOutputName) {
    return defaultOutputName
  },
  defaultAvatar: '/Users/weirui05/Desktop/WechatIMG38388.jpg',
  defaultAuthor: 'AnyPhoto',
  canvasSetting: {
    width: 1000,
    fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
    customFontFamilyPath: '/Users/weirui05/Desktop/Caveat-VariableFont_wght.ttf',
    fallbackFontFamilyIndex: 4,
    backgroundColor,
    color: fontColor,
    fontWeight: 'bold',
    textBaseline: 'top',
    textAlign: 'start',
    fontSize: 30,
    lineGap: 15,
    fontFamilyIndex: 6,
    x: 40,
    y: 20,
    header: {
      headerAlign: 'left',
      headerPaddingTop: 30,
      headerPaddingBottom: 30,
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#ffffff',
      headerAvatarMarginBottom: 20,
      showHeaderAuthor: true,
      headerAuthorFontSize: 30,
      headerAuthorFontColor: fontColor,
      headerAuthorFontWeight: 'bold',
      headAuthorFontFamilyIndex: 6,
      headerAuthorMarginBottom: 20,
      showHeaderTime: true,
      headerTimeFontSize: 26,
      headerTimeFontColor: fontColor,
      headerTimeFontWeight: 'bold',
      headerTimeFontFamilyIndex: 6,
      headerTimeFormat: 'YYYY/MM/DD',
      headerTimePrefix: 'milestone on',
      headerTimeIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f352.png',
      headerTimeIconGap: 6,
      headerTimeIconOffsetY: 2
      // divider: {
      //   size: 'contentWidth',
      //   color: '#fff'
      // }
    },
    footer: {
      paddingY: 60,
      slogan: 'xdz‘baba',
      sloganPosition: 'left',
      sloganFontSize: 25,
      sloganFontColor: fontColor,
      sloganFontWeight: 'bold',
      sloganFontFamilyIndex: 6,
      qrCodeSrc:
        'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_9fa4843931320d05782a97604552033c~c5_300x300.jpeg?from=2956013662',
      qrCodePaddingY: 20
    },
    from: {
      showFrom: false,
      name: '/react and vue',
      fromFontSize: 16,
      fromFontColor: fontColor,
      fromFontWeight: 'bold',
      fromFontFamilyIndex: 6,
      fromMarginTop: 30
    },
    underline: {
      shape: 'wave',
      color: '#fff',
      lineWidth: 1,
      amplitude: 1, // 振幅，这个数字越大，振幅越大
      wavelength: 120, // 波长，这个数字越大，波长越小
      offsetY: 10
    }
  }
}
module.exports = anyPhotoConfig
