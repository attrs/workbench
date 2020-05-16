module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: [
    require('postcss-import')({ root: ctx.file.dirname }),
    require('postcss-url')({ url: 'copy', useHash: true }),
    require('postcss-preset-env')({ stage: 1 }),
    // require('postcss-color-mod-function')({
    //   importFrom: './src/css/variables.css'
    // }),
    require('autoprefixer')
  ]
});
