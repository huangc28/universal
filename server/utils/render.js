export default function renderFullPage (html, initialState) {
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
        <script type='application/javascript' src='build/main.js'></script>
        <script type='application/javascript' src='build/vendor.js'></script>
      </body>
    </html>
  `
}
