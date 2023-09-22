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
  barWatcher
}
