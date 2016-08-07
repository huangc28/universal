import { resolve } from 'path'

export const staticify = require("staticify")(
  resolve(__dirname, '../..' ,'build')
)

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
        <script type='application/javascript' src='${staticify.getVersionedPath('/vendor.js')}'></script>
        <script type='application/javascript' src='${staticify.getVersionedPath('/main.js')}'></script>
      </body>
    </html>
  `
}
