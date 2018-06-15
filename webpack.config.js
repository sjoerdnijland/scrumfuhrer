var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()

    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())
    .enableReactPreset()
    .enableSassLoader()
    .addEntry('js/app', './assets/js/app.jsx')
    .addStyleEntry('css/app', './assets/css/global.scss')
    .configureBabel(function(babelConfig) {
        // add additional presets
        babelConfig.presets.push('react');

    })

;

module.exports = Encore.getWebpackConfig();
