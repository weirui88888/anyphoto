// anyphoto init --theme default || anyphoto init
module.exports = {
  avatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg',
  title: 'AnyPhoto',
  outputName: 'default',
  content: `A1nyphoto is a product that can be used to generate personalized images. You can easily create stylish, personalized images in just a few simple steps. Supports adding avatars, titles, pictures, descriptions, dates, titles, grid backgrounds, annotations, etc. to make your photos lively and interesting instantly.

{What’s more interesting is that every element in the photo is configurable}, so you can design the layout completely according to your creativity and ideas. You can choose your favorite fonts, layout, color palette and everything else.

You can use the generated images anywhere, such as on social media, resumes, journals, or just to capture your thoughts at the moment!`,
  canvasSetting: {
    width: 1250,
    fontFamilys: ['Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
    downloadCustomFontRelativeOutputPath: './',
    backgroundImage: '',
    backgroundColor: ['#565656', '#181818'],
    linearGradientStop: [0, 1],
    linearGradientDirection: 'to right bottom', // to left/to right/to top/to bottom/to left top/to right top/to right bottom/to left bottom
    backgroundLineSpacing: 40,
    backgroundLineColor: '#CCCCCC33',
    color: '#ffffff',
    fontWeight: 'bold',
    textBaseline: 'top',
    textAlign: 'start',
    fontSize: 25,
    lineGap: 12,
    fontFamilyIndex: 0,
    x: 40,
    y: 30,

    header: {
      headerAlign: 'center',
      headerPaddingTop: 100,
      headerPaddingBottom: 30,
      // avatar
      showHeaderAvatar: true,
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
}
