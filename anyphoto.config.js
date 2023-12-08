/*
Tips:
If you find it troublesome to set the colors of different modules
in anyPhotoConfig below, you can set it centrally in colorSetting.
Of course, you can define this variable name at will. The only
thing you need to make sure is that in anyPhotoConfig below, you
must set it correctly to use it. for example:

backgroundColor:'#82b484' ====> backgroundColor:colorSetting.backgroundColor

This is what I consider the design from the perspective of a developer.
If you feel that I am very considerate from the bottom of your heart, don’t forget to give me a github star🌟 ,haha~

🌟 Github Address: https://github.com/weirui88888/anyphoto

const colorSetting = {
  backgroundColor: '#82b484',
  color: '',
  headerAvatarBorderColor: '',
  headerTitleFontColor: '',
  headerDescriptionFontColor: '',
  headerDividerColor: '',
  footerDividerColor: '',
  sloganFontColor: '',
  fromFontColor: ''
}
*/
const demo2 = `Anyphoto is a product that can be used to generate personalized images. You can easily create a stylish, personalized image in just a few simple steps. Supports adding avatar, title, image, description, date, title, annotation content, etc. to make your photos lively and interesting instantly. 

{What’s more interesting is that every element in the photo can be configured}, so you can design the layout exactly according to your own creativity and ideas. You can choose your preferred font, layout, color palette, and everything else.You can use the resulting images anywhere, such as on social media, on your resume, or simply to capture what‘s on your mind at the moment!It is worth mentioning that this tool is {inspired by WeChat reading}. 

It has a variety of ways to use it, from the core toolkit with npm to the API, and of course the intuitive visual interface. Everything is being continuously updated. {Finally, hope you like it.}`
const demo0 =
  'Anyphoto is a product that can be used to generate personalized images. You can easily create a stylish, personalized image in just a few simple steps. Supports adding avatar, title, image, description, date, title, annotation content, etc. to make your photos lively and interesting instantly. {What’s more interesting is that every element in the photo can be configured}, so you can design the layout exactly according to your own creativity and ideas. You can choose your preferred font, layout, color palette, and everything else.You can use the resulting images anywhere, such as on social media, on your resume, or simply to capture what‘s on your mind at the moment!It is worth mentioning that this tool is {inspired by WeChat reading}. It has a variety of ways to use it, from the core toolkit with npm to the API, and of course the intuitive visual interface. Everything is being continuously updated. {Finally, hope you like it.}'
const english = `Anyphoto is a product that can be used to generate personalized images. You can easily create a stylish, personalized image in just a few simple steps. 

Supports adding avatar, title, image, description, date, title, annotation content, etc. to make your photos lively and interesting instantly. {What’s more interesting is that every element in the photo can be configured}, so you can design the layout exactly according to your own creativity and ideas. You can choose your preferred font, layout, color palette, and everything else.

You can use the resulting images anywhere, such as on social media, on your resume, or simply to capture what‘s on your mind at the moment!

It is worth mentioning that this tool is {inspired by WeChat reading}. It has a variety of ways to use it, from the core toolkit with npm to the API, and of course the intuitive visual interface. Everything is being continuously updated. {Finally, hope you like it.}`
const chinese =
  '但也出现了一些问题，之前服务器端{将数据输出到html模版中再给用户的方式在目前的环境中拥有更多}非开发方面的优点，不管是SEO、或是首屏渲染等；相反CSR则一般需要额外的操作才能获得真正有用的内容，比如JS请求和JS执行等。我想解决这些问题一定不是倒退回SSR，用发展的观点来看，技术发展将会让这些问题不再是问题。'
const anyPhotoConfig = {
  defaultSeparator: 'empty',
  defaultContent: demo2,
  defaultOutputDir: 'anyphoto',
  defaultOutputName: 'default',
  defaultOutputNameHandle(defaultOutputName) {
    function generateDate() {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()

      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      return year + '.' + month + '.' + day + '.' + hours + '.' + minutes + '.' + seconds
    }
    return `photo-generate-at-${generateDate()}`
  },
  defaultAvatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg',
  defaultTitle: 'AnyPhoto',
  canvasSetting: {
    width: 1250,
    fontFamilys: ['Custom'],
    customFontPath: 'https://static.anyphoto.space/fonts/Kalam-Bold.ttf',
    downloadCustomFontOutputDir: 'anyphoto-web-font',
    downloadCustomFontRelativeOutputPath: './',
    backgroundColor: ['#565656', '#181818'],
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
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#ffcc00',
      headerAvatarMarginBottom: 20,
      showHeaderTitle: true,
      headerTitleFontSize: 30,
      headerTitleFontColor: '#ffffff',
      headerTitleFontWeight: 'bold',
      headerTitleFontFamilyIndex: 0,
      headerTitleMarginBottom: 30,
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
    },
    footer: {
      paddingY: 60,
      slogan: 'By AnyPhoto',
      sloganPosition: 'right',
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
      amplitude: 2,
      wavelength: 180,
      offsetY: 10
    }
  }
}
module.exports = anyPhotoConfig
