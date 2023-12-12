// anyphoto init --theme default || anyphoto init
module.exports = {
  avatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg',
  title: 'AnyPhoto',
  outputName: 'default',
  content:
    'Anyphoto is a product that can be used to generate personalized images. You can easily create a stylish, personalized image in just a few simple steps. Supports adding avatar, title, image, description, date, title, annotation content, etc. to make your photos lively and interesting instantly. {What’s more interesting is that every element in the photo can be configured}, so you can design the layout exactly according to your own creativity and ideas. You can choose your preferred font, layout, color palette, and everything else. You can use the resulting images anywhere, such as on social media, on your resume, or simply to capture what‘s on your mind at the moment! It is worth mentioning that this tool is {inspired by WeChat reading}. It has a variety of ways to use it, from the core toolkit with npm to the API, and of course the intuitive visual interface. Everything is being continuously updated. {Finally, hope you like it.}',
  canvasSetting: {
    width: 1250,
    fontFamilys: ['Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
    downloadCustomFontRelativeOutputPath: './',
    backgroundColor: '#82b484',
    linearGradientDirection: 'to right bottom',
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
}
