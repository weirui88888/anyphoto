// anyphoto init --theme japanese
module.exports = {
  language: 'zh',
  avatar: '/Users/weirui05/Desktop/rainbow.png',
  author: '任意の写真',
  outputName: '任意の写真',
  content:
    '簡単にパーソナライズされた写真を生成しましょう！わずか数ステップで独自のスタイルを作り出せます。{アバター}、{説明}、{日付}、{作者}、{QRコード}を追加して、写真を活気づけて興味深くしましょう。SNSのシェア、ブログのカバー、または履歴書のプレゼンテーションなど、目立つことができます！当社のnpmツールキットを試して、写真が物語を語るようにしましょう！#フロントエンド開発 #パーソナライズ写真 #クリエイティブツール',
  canvasSetting: {
    width: 750,
    fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
    customFontFamilyPath: '/Users/weirui05/Desktop/LXGWWenKai-Bold.ttf',
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
      headerAlign: 'left',
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
      headerAuthorMarginBottom: 15,

      // description
      showHeaderDescription: true,
      headerDescriptionFontSize: 20,
      headerDescriptionFontColor: '#FFCC66',
      headerDescriptionFontWeight: 'medium',
      headerDescriptionFontFamilyIndex: 6,
      showHeaderDescriptionTime: true,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: 'よろしくお願いします',
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
      slogan: '投稿者: エニフォト',
      sloganPosition: 'left',
      sloganFontSize: 20,
      sloganFontColor: '#FFCC66',
      sloganFontWeight: 'bold',
      sloganFontFamilyIndex: 6,
      qrCodeSrc: '',
      qrCodePaddingY: 10
    },
    from: {
      showFrom: true,
      name: '/ 写真にストーリーを伝えましょう',
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
