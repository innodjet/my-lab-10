exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },

  stylesheets: {
    joinTo: 'app.css'
  }
};

exports.plugins = {
  babel: {
    babelrc: true
  },
  sass: {
    mode: 'native'
  }
}
