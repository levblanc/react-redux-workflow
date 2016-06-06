module.exports = function (tplParams) {
  var manifestSource = tplParams.compilation.assets['manifest.json'].source()
  // remove manifest.json from assets so it won't be written to disk
  delete tplParams.compilation.assets['manifest.json']

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>枫车收银系统</title>
      </head>
      <body>
        <div id='root'></div>
        <script type="text/javascript">
          window.webpackManifest=${ manifestSource };
        </script>
      </body>
    </html>
  `
}


