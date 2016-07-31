// import { resolve } from 'path'

// export const staticify = require("staticify")(
//   resolve(__dirname, '../..' ,'build')
// )

// console.log('staticify', staticify.getVersionedPath(resolve(__dirname, '../..' ,'build', '/main.js')))
// console.log('staticify', staticify.getVersionedPath('/main.js'))

export function renderFullPage (html, initialState) {
  return `<!doctype html>
    <html>
      <head>
        <title>Universal App</title>
      </head>
      <body>
        <div id='app'><div>${html}<div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type='application/javascript' src='build/vendor.js'></script>
        <script type='application/javascript' src='build/main.js'></script>
      </body>
    </html>
  `
}
