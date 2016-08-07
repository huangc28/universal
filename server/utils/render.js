import { resolve } from 'path'

export const staticify = require("staticify")(
  resolve(__dirname, '../..', 'build')
)

export function renderFullPage (html, initialState) {
  // if 'dev' inline css
  // else 'prod' load from css bundle
  const cssBundle = (process.env.NODE_ENV === 'production') ?
  `<link rel="stylesheet" type="text/css" href=${staticify.getVersionedPath('/main.css')}>`:
  ''

  return `<!doctype html>
    <html>
      <head>
        <title>Universal App</title>
        ${cssBundle}
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
