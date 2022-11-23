const { whenProd } = require('@craco/craco')
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity')
const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.crossOriginLoading = 'anonymous'
      return webpackConfig
    },
    plugins: [
      ...whenProd(
        () => [new SubresourceIntegrityPlugin({ hashFuncNames: ['sha256'] })],
        [],
      ),
    ],
  },
}
