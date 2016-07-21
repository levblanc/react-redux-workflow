module.exports = function (tplParams) {
  var manifestSource = tplParams.compilation.assets['chunk-manifest.json'].source()
  // 把assets中的chunk-manifest.json移除，避免它被写到项目文件夹中
  delete tplParams.compilation.assets['chunk-manifest.json']

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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


