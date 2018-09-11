const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const isVue = false;
// if true, install packages: 'vue', 'vue-loader', 'vue-style-loader', 'vue-template-compiler'

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

const paths = require('./webpackConfig/paths');

//Vue
let vueAliases = {};
let vueRule = {};
let vuePlugins = [];

if(isVue) {
  const {VueLoaderPlugin} = require('vue-loader');

  vueRule = {
    test: /\.vue$/,
    use: {
      loader: "vue-loader"
    }
  };
  vueAliases = {
    'vue-components': path.resolve(paths.root, 'vue/components'),
    'vue-modules': path.resolve(paths.root, 'vue/modules'),
    'vue-utils': path.resolve(paths.root, 'vue/utils'),
    'vue$': 'vue/dist/vue.esm.js'
  };

  vuePlugins = [new VueLoaderPlugin()];
}
//end Vue

const devServer = {
  open: true,
  clientLogLevel: 'none',
  index: 'index.html',
  contentBase: path.resolve(paths.root),
};

let twigToHtml = [
  new HtmlWebpackPlugin({
    template: path.resolve(paths.root, 'views/pages/index.twig'),
    filename: 'index.html',
    chunks: ['bundle'],
    templateParameters: {
      all: require(path.resolve(paths.root, 'data/all.json'))
    }
  })
];

const imgRules = [
  {
    test: /\.svg$/,
    include: path.resolve(paths.root, 'assets/svg'),
    use: [
      {
        loader: "file-loader",
        options: {
          context: path.resolve(paths.root),
          name(file) {
            return isProd ? '[path][name].[ext]' : '[path][name].[hash].[ext]';
          }
        }
      }
    ]
  },
  {
    test: /\.(jpg|png|svg)$/,
    exclude: path.resolve(paths.root, 'assets/svg'),
    use: [
      {
        loader: "url-loader",
        options: {
          context: path.resolve(paths.root),
          limit: 10,
          name(file) {
            return isProd ? '[path][name].[ext]' : '[path][name].[hash].[ext]';
          }
        },
      }
    ]
  }
];

const plugins = [
  ...twigToHtml,
  new webpack.DefinePlugin({
    paths: JSON.stringify(paths),
    NODE_ENV: JSON.stringify(NODE_ENV)
  }),
  new MiniCssExtractPlugin({
    filename: !isProd ? 'css/[name].[hash].css' : 'css/[name].css',
    allChunks: false
  }),
  new CleanWebpackPlugin(paths.clean, {
    verbose: true
  }),
  new SpritesmithPlugin({
    src: {
      cwd: path.resolve(paths.root, 'assets/icons'),
      glob: '*.png'
    },
    target: {
      image: path.resolve(paths.root, 'assets/images/sprite.png'),
      css: path.resolve(paths.root, 'sass/common/_sprite.scss')
    },
    spritesmithOptions: {
      algorithm: 'diagonal',
      padding: 5,
      imgName: '../images/sprite.png',
    },
    apiOptions: {
      generateSpriteName: fullPathToSourceFile => {
        const {name} = path.parse(fullPathToSourceFile);
        return `sprite_${name}`;
      },
      cssImageRef: "../assets/images/sprite.png"
    }
  })
].concat(vuePlugins);

if (isProd) {
  imgRules.push({
    loader: 'image-webpack-loader',
    options: {
      bypassOnDebug: true,
      svgo: {
        plugins: [
          {
            cleanupIDs: false,
            removeUselessDefs: false,
            removeUselessStrokeAndFill: false
          }
        ]
      },
    }
  });
}


const webpackConfig = {
  entry: {
    bundle: path.resolve(paths.root, 'js/app.js')
  },
  output: {
    path: path.resolve(paths.public),
    chunkFilename: 'js/[name].bundle.js',
    publicPath: '/',
    filename: 'js/[name].js'
  },
  devServer: devServer,
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      images: path.resolve(paths.root, 'assets/images/'),
      fonts: path.resolve(paths.root,'assets/fonts/'),
      components: path.resolve(paths.root, 'js/components'),
      modules: path.resolve(paths.root,'js/modules'),
      utils: path.resolve(paths.root,'js/utils'),
      ...vueAliases
    },
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ['env'],
            plugins: ['syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.twig$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'twig-loader'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : isVue ? 'vue-style-loader': 'style-loader',
            options: isProd ? {
              publicPath: '../'
            } : {}
          },
          {
            loader: "css-loader",
            options: {
              minimize: isProd ? {discardComments: {removeAll: true}} : false,
              sourceMap: !isProd,
              alias: {
                images: path.resolve(paths.root, 'assets/images/')
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 9', 'last 4 version']
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !isProd,
              data: `@import "global";`,
              includePaths: [
                path.resolve(paths.root, "sass/")
              ]
            }
          },

        ]
      },
      {
        test: /\.ttf|woff|woff2$/,
        loader: 'file-loader',
        options: {
          name(file) {
            return isProd ? 'assets/fonts/[name].[ext]' : 'assets/fonts/[name].[hash].[ext]';
          }
        }
      }
    ].concat(imgRules).concat(vueRule)
  },
  plugins: plugins
};

module.exports = webpackConfig;
