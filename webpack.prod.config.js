const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (template) => ({
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template,
            title: "Мессенджер",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true,
            },
        }),
    ],
})
