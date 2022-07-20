const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (template) => ({
    mode: "development",
    stats: {
        errorDetails: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: template,
            title: "Режим разработки",
        }),
    ],
})
