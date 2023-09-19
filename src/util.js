const ora = require('ora')

const generateOra = options => ora(options)

const sleep = time => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time * 1000)
  })
}

module.exports = {
  generateOra,
  sleep
}
