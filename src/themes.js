module.exports = {
  theme1: {
    language: 'en',
    canvasConfig: {
      width: 750,
      fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
      customFontFamilyPath: '/Users/weirui05/Desktop/Caveat-VariableFont_wght.ttf',
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
  },
  theme2: {
    language: 'zh',
    canvasConfig: {
      width: 1250,
      fontFamilys: ['Arial', 'Times New Roman', 'Verdana', 'Tahoma', 'Courier New', 'Helvetica', 'Custom'],
      customFontFamilyPath: '/Users/weirui05/Desktop/LXGWWenKai-Regular.ttf',
      fallbackFontFamilyIndex: 4,
      backgroundColor: '#996633',
      color: '#fff',
      fontWeight: 'bold',
      textBaseline: 'top',
      textAlign: 'start',
      fontSize: 30,
      lineGap: 30,
      fontFamilyIndex: 6,
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
}
