// anyphoto init --theme korean
module.exports = {
  separator: 'empty',
  avatar: '/Users/weirui05/Desktop/hacker.png',
  author: '아무사진',
  outputName: '아무사진',
  content:
    '나만의 사진을 쉽게 생성해보세요! 단 몇 단계만으로 자신만의 독특한 스타일을 만들어 보세요. 아바타, 설명, 날짜, 작성자 및 QR 코드를 추가하여 사진을 즉시 생생하고 흥미롭게 만드세요. 소셜 미디어 공유, 블로그 표지, 이력서 프레젠테이션 등 무엇이든 눈에 띌 수 있습니다! npm 툴킷을 사용해 보고 사진에 이야기를 담아보세요! #프론트엔드개발 #개인화된사진 #크리에이티브 도구',
  canvasSetting: {
    width: 750,
    fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/LXGWWenKai-Bold.ttf',
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
      headerAlign: 'right',
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
      headerDescriptionPrefix: '만나서 반가워요',
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
      slogan: 'By 애니포토',
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
      name: '/ 사진에 이야기를 담아보세요',
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
