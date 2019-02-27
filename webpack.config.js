const path = require('path');

module.exports = {
    entry: {
        mavenEngage: './app/src/maven-engage/main.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        publicPath: "/dist/",
        compress: true,
        port: 9000
    }
};