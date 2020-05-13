module.exports = {
  parser: 'postcss',
  sourceMap: true,
  plugins: [
    require('postcss-import')(),
    require('postcss-url')({ url: 'copy', useHash: true }),
    require('postcss-preset-env')({
      stage: 3,
      browsers: [
        '>1%',
        'last 4 versions',
        'Safari >= 7',
        'Explorer >= 11',
        'iOS >= 9',
        'Android >= 4'
      ]
    }),
    require('postcss-color-mod-function')(),
    /* require('cssnano')({
      reduceIdents: false,
      safe: true
    })*/
  ]
};