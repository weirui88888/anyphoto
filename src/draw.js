class Drawer {
  constructor({ word, anyPhotoConfig }) {
    this.word = word
    this.anyPhotoConfig = anyPhotoConfig
  }
}

const draw = ({ word, anyPhotoConfig }) => {
  console.log(word, anyPhotoConfig)
}

module.exports = draw
