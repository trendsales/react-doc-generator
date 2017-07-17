const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = () => {
  return {
    entry: path.join(process.cwd(), 'docs.js'),
    output: {
      filename: 'bundle.js',
    },
    resolve: {
      modules: [
        path.join(process.cwd(), 'src'),
        'node_modules',
      ],
      plugins: [
        new DirectoryNamedWebpackPlugin(),
      ],
      alias: {
        shared: path.join(process.cwd(), 'src/components/shared'),
        connect: path.join(process.cwd(), 'rc/components/shared/reduxmapper/connect'),
        apirequest: path.join(process.cwd(), 'src/api/apirequest.js'),
      },
    },
    plugins: [
      new ContextReplacementPlugin(
        /Icon[\/]svg$/,
        /[^\/]+\.svg$/
      ),
    ],
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.js/,
        loader: 'babel-loader',
        options: {
          presets: ['latest', 'stage-1', 'react'],
        },
      }, {
        test: /\.css/,
        use: [
          path.join(__dirname, './loaders/style'),
          'css-loader',
        ],
      }, {
        test: /\.less/,
        use: [
          path.join(__dirname, './loaders/style'),
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
          'less-loader',
        ],
      }, {
        test: /\.(txt|svg)$/,
        loader: 'raw-loader',
      }],
    },
  };
};
