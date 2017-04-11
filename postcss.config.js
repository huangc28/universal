module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%'],
    }),
    require('postcss-flexibility')(),
  ],
}
