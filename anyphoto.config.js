/*
Tips:
If you find it troublesome to set the colors of different modules
in anyPhotoConfig below, you can set it centrally in colorSetting.
Of course, you can define this variable name at will. The only
thing you need to make sure is that in anyPhotoConfig below, you
must set it correctly to use it. for example:

backgroundColor:'#006666' ====> backgroundColor:colorSetting.backgroundColor

This is what I consider the design from the perspective of a developer.
If you feel that I am very considerate from the bottom of your heart, don’t forget to give me a github star🌟 ,haha~

🌟 Github Address: https://github.com/weirui88888/anyphoto

const colorSetting = {
  backgroundColor: '#006666',
  color: '',
  headerAvatarBorderColor: '',
  headerAuthorFontColor: '',
  headerDescriptionFontColor: '',
  headerDividerColor: '',
  footerDividerColor: '',
  sloganFontColor: '',
  fromFontColor: ''
}
*/

const anyPhotoConfig = {
  defaultSeparator: 'space',
  defaultContent:
    'Generate personalized photos easily! Create your own unique style in just a few steps. Add avatar, description, date, author and QR code to make your photos lively and interesting instantly. Whether it‘s social media sharing, blog cover, or resume presentation, you can stand out! Try our npm toolkit and let your photos tell a story!                                                                       #frontenddevelopment #personalizedphoto #creativetools',
  defaultOutputDir: 'anyphoto',
  defaultOutputName: 'anyphoto',
  defaultOutputNameHandle(defaultOutputName) {
    return `${Date.now()}-${defaultOutputName}`
  },
  defaultAvatar: 'https://static.anyphoto.space/logos/logo1/logo.png',
  defaultAuthor: 'Anyphoto',
  canvasSetting: {
    width: 1250,
    fontFamilys: ['Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
    downloadCustomFontRelativeOutputPath: '../',
    backgroundColor: '#82b484',
    color: '#ffffff',
    fontWeight: 'bold',
    textBaseline: 'top',
    textAlign: 'start',
    fontSize: 30,
    lineGap: 30,
    fontFamilyIndex: 0,
    x: 40,
    y: 30,
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
      headerAuthorFontColor: '#ffffff',
      headerAuthorFontWeight: 'bold',
      headAuthorFontFamilyIndex: 6,
      headerAuthorMarginBottom: 30,
      showHeaderDescription: true,
      headerDescriptionFontSize: 20,
      headerDescriptionFontColor: '#ffffff',
      headerDescriptionFontWeight: 'medium',
      headerDescriptionFontFamilyIndex: 6,
      showHeaderDescriptionTime: true,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: 'recorded at',
      // headerDescriptionPrefixIcon: 'https://static.anyphoto.space/logos/logo1/logo.png',
      headerDescriptionPrefixIconGap: 6,
      headerDescriptionPrefixIconOffsetY: 4
      // divider: {
      //   size: 'contentWidth',
      //   color: '#FFFFFF'
      // }
    },
    footer: {
      paddingY: 60,
      slogan: 'By AnyPhoto',
      sloganPosition: 'right',
      sloganFontSize: 20,
      sloganFontColor: '#ffffff',
      sloganFontWeight: 'bold',
      sloganFontFamilyIndex: 6,
      qrCodeSrc: 'https://static.anyphoto.space/logos/logo1/logo_transparent.png',
      qrCodePaddingY: 20
    },
    from: {
      showFrom: true,
      name: '/ Photo by any inspiration',
      fromFontSize: 20,
      fromFontColor: '#ffffff',
      fromFontWeight: 'bold',
      fromFontFamilyIndex: 6,
      fromMarginTop: 50
    },
    underline: {
      shape: 'line',
      color: 'yellow',
      lineWidth: 2,
      amplitude: 2,
      wavelength: 180,
      offsetY: 14
    }
  }
}
module.exports = anyPhotoConfig
