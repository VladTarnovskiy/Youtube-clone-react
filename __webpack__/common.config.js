import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const STATIC_DIR = path.resolve(__dirname, '..', 'static');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, 'index.html'),
    filename: 'index.html',
    // favicon: path.join(STATIC_DIR, './favicon.svg'),
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve(STATIC_DIR, 'favicon.svg'),
    // prefix: '/favicons/',
    // outputPath: path.resolve(BUILD_DIR),
    mode: 'light',
  }),
  new webpack.HotModuleReplacementPlugin(), // For page reloading
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const devServer = {
  historyApiFallback: true, // Apply HTML5 History API if routes are used
  open: true,
  compress: true,
  allowedHosts: 'all',
  hot: true, // Reload the page after changes saved (HotModuleReplacementPlugin)
  client: {
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: {
      errors: true,
      warnings: true,
    },
    progress: true, // Prints compilation progress in percentage in the browser.
  },

  port: 3000,
  /**
   * Writes files to output path (default: false)
   * Build dir is not cleared using <output: {clean:true}>
   * To resolve should use FileManager
   */
  devMiddleware: {
    writeToDisk: true,
  },
  // static: [
  //   // Required to use favicons located in a separate directory as assets
  //   // Should use with historyApiFallback, to avoid of 404 for routes
  //   {
  //     directory: path.join(BUILD_DIR, 'favicons'),
  //   },
  // ],
};

export default {
  devServer,
  plugins,
  entry: path.join(__dirname, '..', 'src', 'index.tsx'),
  output: {
    path: BUILD_DIR,
    /**
     * Helps to avoid of MIME type ('text/html') is not a supported stylesheet
     * And sets address in html imports
     */
    // publicPath: '/',
  },
  // Checking the maximum weight of the bundle is disabled
  performance: {
    hints: false,
  },
  // Modules resolved
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.join(__dirname, '..', 'src'),
      assets: path.join(__dirname, '..', 'src/assets'),
    },
  },
  module: {
    strictExportPresence: true, // Strict mod to avoid of importing non-existent objects
    rules: [
      // --- JS | TS USING BABEL
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Using a cache to avoid of recompilation
          },
        },
      },
      // --- HTML
      { test: /\.(html)$/, use: ['html-loader'] },
      // --- S/A/C/SS
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates css into CommonJS
            options: {
              esModule: true,
              // css modules
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]', // format of output
                namedExport: true, // named exports instead of default
              },
            },
          },
          {
            // autoprefixer
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      // --- S/A/SS
      {
        test: /\.(s[ac])ss$/i,
        use: ['sass-loader'],
      },
      // --- IMG
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext]',
        },
      },
      // --- FONTS
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
    ],
  },
};
