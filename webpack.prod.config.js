const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (template) => ({
    mode: "production",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader],
            },
        ],
    },
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
        new MiniCssExtractPlugin(),
    ],
})
