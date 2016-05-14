var path = require('path');

module.exports = require('./make-webpack-config')({
    minimize: true,
    devtool: 'source-map',
    npmBuild: true,
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react/lib/ReactCSSTransitionGroup": "react/lib/ReactCSSTransitionGroup"
    },
    outputDir: 'module'
});
