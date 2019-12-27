const fs = require("fs");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PAGE_DIR = path.join("src", "pages", path.sep);

function getFilesFromDir(dir, fileTypes) {
  const filesToReturn = [];
  function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (let i in files) {
      const curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
        filesToReturn.push(curFile);
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn;
}

function extractMeta(meta, fileStr) {
  let pos1 = fileStr.indexOf(`// ${meta}:`)
  if (pos1 === -1) {
    return null
  } else {
    pos1 += meta.length + 4
  }
  const pos2 = fileStr.indexOf('\n', pos1)
  if (pos2 === -1) {
    return null
  }
  return fileStr.substring(pos1, pos2).trim()
}

const validMetaTags = ['desc', 'keywords', 'author']

const htmlPlugins = getFilesFromDir(PAGE_DIR, [".tsx"]).map(filePath => {
  const fileStr = fs.readFileSync(filePath, { encoding: 'utf8' })
  const meta = validMetaTags.reduce((acc, tag) => {
    const metaVal = extractMeta(tag, fileStr)
    if (metaVal) {
      acc[tag] = metaVal
    }
    return acc
  }, {})
  const fileName = filePath.replace(PAGE_DIR, "").replace(path.extname(filePath), "") + ".html";
  const pageChunk = fileName.replace(path.extname(fileName), "")
  return new HtmlWebPackPlugin({
    title: extractMeta('title', fileStr) || 'Webpage',
    chunks: [pageChunk, "modules", "comps"],
    template: 'src/templates/index.ejs',
    filename: fileName,
    favicon: 'src/assets/images/favicon.ico',
    inject: false,
    pageChunk: pageChunk,
    meta: meta
  })
});

const entry = getFilesFromDir(PAGE_DIR, [".tsx"]).reduce((obj, filePath) => {
  const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
  obj[entryChunkName] = `./${filePath}`;
  return obj;
}, {});

module.exports = (env, argv) => ({
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: argv.mode === 'production' ? '[name].[chunkhash:4].js' : '[name].[hash].js'
  },
  devtool: argv.mode === 'production' ? false : 'eval-source-maps',
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: argv.mode === 'production' ? 'style.[contenthash:4].css' : 'style.[hash].css'
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      comps: path.resolve(__dirname, "src", "comps")
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader"
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|jpg|jpeg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (url, resourcePath, context) => {
                if (argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                }
                return `/assets/images/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                if (argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                }
                return `/assets/fonts/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      }]
  },
  optimization: {
    minimize: argv.mode === 'production' ? true : false,
    splitChunks: {
      cacheGroups: {
        modules: {
          test: /node_modules/,
          chunks: "initial",
          name: "modules",
          enforce: true
        },
        comps: {
          test: /src\/comps/,
          chunks: "initial",
          name: "comps",
          enforce: true
        }
      }
    }
  }
});