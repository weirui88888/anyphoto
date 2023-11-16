// anyphoto init --theme huangshan
module.exports = {
  separator: 'empty',
  avatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg',
  author: '黄山',
  outputName: '黄山',
  content:
    '黄山的景色秀丽神奇，尤其是那些怪石，{有趣极了}。就说“仙女弹琴”吧，那美丽的{仙女弹着琴}，悠扬的琴声在山间久久回荡，好像在让人们评赞她的琴声。瞧，那陡峭的山峰上有一只可爱的小狗，抬头望着月亮，好像是要到月亮上去看看吧，这就是有趣的“{天狗望月}”。黄山的奇石还有很多，像“狮子抢球”、“猴子观海”、“龟鱼对望”等，{千姿百态，惟妙惟肖}。',
  canvasSetting: {
    width: 1250,
    fontFamilys: ['Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
    backgroundColor: '#996633',
    color: '#fff',
    fontWeight: 'bold',
    textBaseline: 'top',
    textAlign: 'start',
    fontSize: 30,
    lineGap: 30,
    fontFamilyIndex: 0,
    x: 40,
    y: 60,

    header: {
      headerAlign: 'center',
      headerPaddingTop: 30,
      headerPaddingBottom: 30,
      // avatar
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#fff',
      headerAvatarMarginBottom: 20,

      // author
      showHeaderAuthor: true,
      headerAuthorFontSize: 30,
      headerAuthorFontColor: '#fff',
      headerAuthorFontWeight: 'bold',
      headAuthorFontFamilyIndex: 6,
      headerAuthorMarginBottom: 30,

      // description
      showHeaderDescription: true,
      headerDescriptionFontSize: 20,
      headerDescriptionFontColor: '#fff',
      headerDescriptionFontWeight: 'medium',
      headerDescriptionFontFamilyIndex: 6,
      showHeaderDescriptionTime: false,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: '五岳归来不看山，黄山归来不看岳',
      headerDescriptionPrefixIcon: 'https://pic.sopili.net/pub/emoji/noto-emoji/png/128/emoji_u26f0.png',
      headerDescriptionPrefixIconGap: 6,
      headerDescriptionPrefixIconOffsetY: 4,
      divider: {
        size: 'contentWidth',
        color: '#fff'
      }
    },
    footer: {
      // divider: {
      //   size: 'contentWidth',
      //   color: '#fff'
      // },
      paddingY: 60,
      slogan: 'By AnyPhoto',
      sloganPosition: 'right',
      sloganFontSize: 20,
      sloganFontColor: '#fff',
      sloganFontWeight: 'bold',
      sloganFontFamilyIndex: 6,
      qrCodeSrc: '',
      qrCodePaddingY: 10
    },
    from: {
      showFrom: true,
      name: '/ 用照片记录你的灵感',
      fromFontSize: 20,
      fromFontColor: '#fff',
      fromFontWeight: 'bold',
      fromFontFamilyIndex: 6,
      fromMarginTop: 50
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
