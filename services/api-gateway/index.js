'use strict'

require('./server')

process.on('unhandledRejection', (err, promise) => {
  console.error('An unhandledRejection occurred')
  console.error(err)
  console.error(`Rejected Promise: ${promise}`)
  console.error(`Rejection: ${err}`)
  process.exit(1)
})
