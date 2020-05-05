const path = require('path')
const mode = process.env.NODE_ENV
module.exports = {
    devServer: {
       publicPath: '/build/',
       proxy: {
         '/api': 'http://localhost:3000'
       },
       hot: true,
    },
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',∂
    },
    mode,
    module:{
        rules:[
             { 
               test: /\.jsx?/,
               exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                 options: {
                   presets: ['@babel/preset-env','@babel/preset-react']
                } 
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
              },    
        ]
    }
  };
