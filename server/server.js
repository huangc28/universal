/* global __CLIENT__ */
import 'babel-polyfill'
import http from 'http'

import app from './express'

const server = http.createServer(app)
const PORT = 3005
server.listen(PORT, () => {
  console.log(`server now hosted on port ${PORT}`)
})
