const defaultCanvasSetting = {
  width: 1250,
  fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
  customFontPath: 'https://static.anyphoto.space/fonts/Caveat-VariableFont_wght.ttf',
  downloadCustomFontOutputDir: 'anyphoto-web-font',
  fallbackFontFamilyIndex: 4,
  backgroundColor: '#82b484',
  color: '#ffffff',
  fontWeight: 'bold',
  textBaseline: 'top',
  textAlign: 'start',
  fontSize: 30,
  lineGap: 30,
  fontFamilyIndex: 6,
  x: 40,
  y: 30,

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
    headerAuthorFontColor: '#ffffff',
    headerAuthorFontWeight: 'bold',
    headAuthorFontFamilyIndex: 6,
    headerAuthorMarginBottom: 30,

    // description
    showHeaderDescription: true,
    headerDescriptionFontSize: 20,
    headerDescriptionFontColor: '#ffffff',
    headerDescriptionFontWeight: 'medium',
    headerDescriptionFontFamilyIndex: 6,
    showHeaderDescriptionTime: true,
    headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
    headerDescriptionPrefix: 'recorded at',
    headerDescriptionPrefixIcon: '',
    headerDescriptionPrefixIconGap: 6,
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
    sloganFontSize: 20,
    sloganFontColor: '#ffffff',
    sloganFontWeight: 'bold',
    sloganFontFamilyIndex: 6,
    qrCodeSrc: '',
    qrCodePaddingY: 10
  },
  from: {
    showFrom: true,
    name: '/ Photo by any inspiration',
    fromFontSize: 20,
    fromFontColor: '#ffffff',
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

module.exports = {
  defaultCanvasSetting
}
