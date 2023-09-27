const anyPhotoConfig = {
  defaultOutput: 'anyphoto',
  defaultAvatar: 'https://m0-file2.bybutter.com/head-image/21e8a53c1e9d514eff1099f43465721b.jpg',
  defaultAuthor: 'AnyPhoto',
  canvasSetting: {
    width: 750,
    fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
    customFontFamilyPath: '/Users/weirui05/Desktop/Pacifico-Regular.ttf',
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
      headerAuthorMarginBottom: 15,
      showHeaderTime: true,
      headerTimeFontSize: 20,
      headerTimeFontColor: '#FFCC66',
      headerTimeFontWeight: 'medium',
      headerTimeFontFamilyIndex: 6,
      headerTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerTimePrefix: 'milestone on',
      headerTimeIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f389.png',
      headerTimeIconGap: 12,
      divider: {
        size: 'contentWidth',
        color: '#FFCC66'
      }
    },
    footer: {
      //   divider: {
      //     size: 'contentWidth',
      //     color: '#FFCC66'
      //   },
      paddingY: 40,
      slogan: 'wechat reading',
      sloganPosition: 'left',
      sloganFontSize: 16,
      sloganFontColor: '#FFCC66',
      sloganFontWeight: 'bold',
      sloganFontFamilyIndex: 6,
      qrCodeSrc:
        'https://butter-file.oss-cn-beijing.aliyuncs.com/uploaded/toaster/3daf654b-84ab-4655-aa90-6912f88ca80f.png',
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
