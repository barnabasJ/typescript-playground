import PnpWebpackPlugin from 'pnp-webpack-plugin'

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
