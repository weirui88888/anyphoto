const path = require('path')
const fs = require('fs')
const isImageUrl = require('is-image-url')

const { defaultConfigName, defaultAvatar, validTheme } = require('./config')
const ora = require('ora')

const generateOra = options => ora(options)

const sleep = time => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time * 1000)
  })
}

const getUserAnyPhotoConfigPath = directory => {
  const filePath = path.join(directory, defaultConfigName)
  if (fs.existsSync(filePath)) {
    return filePath
  }
  const parentDirectory = path.dirname(directory)
  if (parentDirectory === directory) {
    return
  }
  return getUserAnyPhotoConfigPath(parentDirectory)
}

const getUserAnyPhotoConfig = () => {
  const userAnyPhotoConfigPath = getUserAnyPhotoConfigPath(process.cwd())
  return userAnyPhotoConfigPath ? require(userAnyPhotoConfigPath) : {}
}

const handelValidAnyPhotoConfig = ({ theme, author, avatar }) => {
  const validAvatar = isImageUrl(avatar) ? avatar : defaultAvatar
  return {
    author,
    theme: validTheme.includes(theme) ? theme : validTheme[0],
    avatar: validAvatar
  }
}

module.exports = {
  generateOra,
  sleep,
  getUserAnyPhotoConfigPath,
  getUserAnyPhotoConfig,
  handelValidAnyPhotoConfig
}
