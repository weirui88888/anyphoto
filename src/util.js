const cliProgress = require('cli-progress')

const c = require('ansi-colors')

const ora = require('ora')

const generateOra = options => ora(options)

const sleep = time => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time * 1000)
  })
}

const colorTip = (msg, ...args) => {
  if (args.length === 0) {
    return console.log(msg)
  }
  const nextStyle = args[0]
  return colorTip(c[nextStyle](msg), ...args.slice(1))
}

const color = (msg, ...args) => {
  if (args.length === 0) {
    return msg
  }
  const nextStyle = args[0]
  return color(c[nextStyle](msg), ...args.slice(1))
}

const formatDateTime = (date, format) => {
  const directory = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/gi, matchedKey => {
    const value = directory[matchedKey]
    if (matchedKey === 'HH' || matchedKey === 'mm' || matchedKey === 'ss') {
      return value < 10 ? '0' + value : value
    }
    return value
  })
}

const barWatcher = new cliProgress.SingleBar({
  format: 'Generate Progress ' + color('{bar}', 'green') + ' now status is => ' + color('{step}', 'green'),
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
})

module.exports = {
  generateOra,
  sleep,
  color,
  colorTip,
  barWatcher,
  formatDateTime
}
