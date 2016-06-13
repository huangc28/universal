import 'babel-polyfill'
import router from 'react-router'
import path from 'path'
import koa from 'koa'
const app = koa()

// handle all requests.

app.use(function *() {
  console.log('koa request', this.request)
  this.body = 'node backend'
})

app.listen(8086)
