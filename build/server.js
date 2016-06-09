import koa from 'koa'
const app = koa()

// x-response-time

app.use(function *(next){
  // console.log('next', next)
  var start = new Date
  console.log('x response time triggered')
  yield next
  var ms = new Date - start
  this.set('X-Response-Time', ms + 'ms')
})

// // logger
//
// app.use(function *(next){
//   var start = new Date
//   console.log('logger triggered')
//   yield next;
//   var ms = new Date - start
//   console.log('%s %s - %s', this.method, this.url, ms)
// })


app.use(function *() {
  console.log('request', this.request)
  this.body = 'Hello world'
})

app.listen(8086)
