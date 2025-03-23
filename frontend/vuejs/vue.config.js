const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = defineConfig({
  lintOnSave: true,
  productionSourceMap: false,
  transpileDependencies: true,

  chainWebpack: (config) => {
    // Configuración para cargar archivos .txt
    config.module
      .rule('txt')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()

    // Definición de variables globales para Vue
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
      return definitions
    })
  },

  configureWebpack: {
    plugins: [
      // Compresión Gzip
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      
      // Compresión Brotli
      new CompressionWebpackPlugin({
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
      }),

      // Análisis de paquetes
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      }),
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      serveIndex: false,
    },
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'http://localhost:8080',
    },
  },
})

