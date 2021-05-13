const PnpWebpackPlugin = require(`pnp-webpack-plugin`)

module.exports = {
    default: () => ({
        resolve: {
            plugins: [PnpWebpackPlugin],
        },
        resolveLoader: {
            plugins: [PnpWebpackPlugin.moduleLoader(module)],
        },
    }),
}
