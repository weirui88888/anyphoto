// anyphoto init --theme theme1
module.exports = {
  separator: 'space',
  avatar: '/Users/weirui05/Desktop/WechatIMG38388.jpg',
  author: 'AnyPhoto',
  outputName: 'anyphoto',
  content:
    'Generate personalized photos {easily}! Create your own unique style in just a few steps. Add {avatar}, {description}, {date}, {author} and {QR code} to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and {let your photos tell a story}!  #frontenddevelopment #personalizedphoto #creativetools',
  canvasSetting: {
    width: 750,
    fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
    customFontPath: 'https://show.newarray.vip/font/LXGWWenKai-Bold.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
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
      // avatar
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#FFCC00',
      headerAvatarMarginBottom: 20,

      // author
      showHeaderAuthor: true,
      headerAuthorFontSize: 30,
      headerAuthorFontColor: '#FFCC66',
      headerAuthorFontWeight: 'bold',
      headAuthorFontFamilyIndex: 6,
      headerAuthorMarginBottom: 5,

      // description
      showHeaderDescription: true,
      headerDescriptionFontSize: 20,
      headerDescriptionFontColor: '#FFCC66',
      headerDescriptionFontWeight: 'medium',
      headerDescriptionFontFamilyIndex: 6,
      showHeaderDescriptionTime: true,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: 'Nice to meet you at',
      headerDescriptionPrefixIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u1f308.png',
      headerDescriptionPrefixIconGap: 6,
      headerDescriptionPrefixIconOffsetY: 4
      // divider: {
      //   size: 'contentWidth',
      //   color: '#FFCC66'
      // }
    },
    footer: {
      // divider: {
      //   size: 'contentWidth',
      //   color: '#FFCC66'
      // },
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
      lineWidth: 2,
      amplitude: 2, // amplitude, the larger the number, the greater the amplitude
      wavelength: 180, // wavelength, the larger the number, the smaller the wavelength
      offsetY: 10
    }
  }
}
