const chalk = require('chalk')

const ora = require('ora')

const generateOra = options => ora(options)

const sleep = time => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time * 1000)
  })
}

const yellow = msg => console.log(chalk.yellow(msg))

const green = msg => console.log(chalk.green(msg))

module.exports = {
  generateOra,
  sleep,
  green,
  yellow
}
