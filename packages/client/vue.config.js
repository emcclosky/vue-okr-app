const path = require('path')

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addSassResource(config.module.rule('scss').oneOf(type)));
        config.plugins.delete('prefetch');
    },
    devServer: {
        proxy:
        {
          '^/auth': {
            target: 'http://localhost:8000',
            changeOrigin: true
          },
        }
    }
};

function addSassResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/styles/utilities/functions/*.scss'),
                path.resolve(__dirname, './src/assets/styles/utilities/mixins/*.scss'),
                path.resolve(__dirname, './src/assets/styles/settings/*.scss'),
            ],
        });
}