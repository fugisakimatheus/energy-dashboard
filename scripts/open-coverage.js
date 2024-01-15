const { exec } = require('child_process')
const path = require('path')

const url = path.resolve(__dirname, '../jest-coverage/lcov-report/index.html')
const start =
  process.platform === 'darwin'
    ? 'open'
    : process.platform === 'win32'
    ? 'start'
    : 'xdg-open'

exec(`${start} ${url}`)