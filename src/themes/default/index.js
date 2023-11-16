// anyphoto init --theme default || anyphoto init
module.exports = {
  separator: 'space',
  avatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg',
  author: 'AnyPhoto',
  outputName: 'default',
  content:
    'Generate personalized photos {easily}! Create your own unique style in just a few steps. Add {avatar}, {description}, {date}, {author} and {QR code} to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and {let your photos tell a story}!  #frontenddevelopment #personalizedphoto #creativetools',
  canvasSetting: {
    width: 750,
    fontFamilys: ['Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/Caveat-VariableFont_wght.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
    backgroundColor: '#006666',
    color: '#FFCC66',
    fontWeight: 'bold',
    textBaseline: 'top',
    textAlign: 'start',
    fontSize: 30,
    lineGap: 15,
    fontFamilyIndex: 0,
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
