const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')

module.exports = (config) => {
  const bundler = webpack(config);
  const app = express();
  app.use(webpackDevMiddleware(bundler))
  app.get('/', (req, res) => {
    res.end(`
      <html>
        <head>
        </head>
        <body>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
  });

  return app;
};
