const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (template) => ({
    mode: "development",
    devServer: {
        historyApiFallback: true,
    },
    stats: {
        errorDetails: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: template,
            title: "Режим разработки",
        }),
    ],
})
