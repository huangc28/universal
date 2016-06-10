import 'babel-polyfill'
import path from 'path'
import koa from 'koa'
const app = koa()

app.use(function *() {
  console.log('request', this.request)
  this.body = 'node backend'
})

app.listen(8086)
