const defaultCanvasSetting = {
  width: 1250,
  fontFamilys: ['Custom'],
  customFontPath: 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf',
  downloadCustomFontOutputDir: 'anyphoto-web-font',
  downloadCustomFontRelativeOutputPath: './',
  backgroundColor: '#82b484',
  linearGradientDirection: 'to right bottom', // to left/to right/to top/to bottom/to left top/to right top/to right bottom/to left bottom
  color: '#ffffff',
  fontWeight: 'bold',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 25,
  lineGap: 30,
  fontFamilyIndex: 0,
  x: 40,
  y: 30,

  header: {
    headerAlign: 'center',
    headerPaddingTop: 100,
    headerPaddingBottom: 30,
    // avatar
    headerAvatarSize: 80,
    headerAvatarBorderWidth: 4,
    headerAvatarBorderColor: '#ffcc00',
    headerAvatarMarginBottom: 20,

    // title
    showHeaderTitle: true,
    headerTitleFontSize: 30,
    headerTitleFontColor: '#ffffff',
    headerTitleFontWeight: 'bold',
    headerTitleFontFamilyIndex: 0,
    headerTitleMarginBottom: 30,

    // description
    showHeaderDescription: true,
    headerDescriptionFontSize: 25,
    headerDescriptionFontColor: '#ffffff',
    headerDescriptionFontWeight: 'medium',
    headerDescriptionFontFamilyIndex: 0,
    showHeaderDescriptionTime: true,
    headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
    headerDescriptionPrefix: 'Happy meet you at',
    headerDescriptionPrefixIcon: 'https://static.anyphoto.space/core/themes/default/rainbow.png',
    headerDescriptionPrefixIconGap: 10,
    headerDescriptionPrefixIconOffsetY: 4
    // divider: {
    //   size: 'contentWidth',
    //   color: '#ffffff'
    // }
  },
  footer: {
    // divider: {
    //   size: 'contentWidth',
    //   color: '#ffffff'
    // },
    paddingY: 60,
    slogan: 'By AnyPhoto',
    sloganPosition: 'right', // left || right
    sloganFontSize: 25,
    sloganFontColor: '#ffffff',
    sloganFontWeight: 'bold',
    sloganFontFamilyIndex: 0,
    sloganIcon: '',
    sloganIconOffsetY: 0,
    sloganIconPaddingY: 10
  },
  from: {
    showFrom: true,
    name: '/ Photo by any inspiration',
    fromFontSize: 25,
    fromFontColor: '#ffffff',
    fromFontWeight: 'bold',
    fromFontFamilyIndex: 0,
    fromMarginTop: 60
  },
  underline: {
    shape: 'line',
    color: '#ffcc00',
    lineWidth: 4,
    amplitude: 2, // amplitude, the larger the number, the greater the amplitude
    wavelength: 180, // wavelength, the larger the number, the smaller the wavelength
    offsetY: 10
  }
}

module.exports = {
  defaultCanvasSetting
}
